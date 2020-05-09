<script context="module">
    export async function preload(page, session) {
        const requests = await this.fetch('/requestsView').then(res => res.json());
        return {
            requests,
            session
        };
    }
</script>

<script>
    export let session;
    export let requests;
    import viewRequestDisplay from '../components/viewRequestDisplay.svelte';
    let error;
    let newrequestText = "";
    function showError(errorMessage) {
        error.innerText = String(errorMessage);
        error.style.display = "block";
    }
    async function approveRequest(request) {
        try {
            const res = await fetch('/viewRequests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requestId: request.gameRequestId,
                    title: request.title,
                    price: request.price,
                    platform: request.platform,
                    description: request.description,
                    publisher: request.publisher,
                    genre: request.genre,
                    imgSrc: request.imgSrc,
                    userId: session.user,
                    isAccepted: 1
                })
            });
            if (res.ok) {
                newrequestText = "";
                window.location.href = "/viewRequests";
            } else {
                showError(await res.text());
            }
        } catch (err) {
            showError(err);
        }
    }
    async function declineRequest(request) {
        try {
            const res = await fetch('/viewRequests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requestId: request.gameRequestId,
                    userId: session.user,
                    isAccepted: 0
                })
            });
            if (res.ok) {
                newrequestText = "";
                window.location.href = "/viewRequests";
            } else {
                showError(await res.text());
            }
        } catch (err) {
            showError(err);
        }
    }
</script>

<style>
    #error {
        background-color: #ff7a7a;
        display: none;
    }
</style>

<div id="error" bind:this={error}></div>

    <h1>Requests</h1>
    {#each requests as request}
    <div style="border: 1px solid black;">
        <viewRequestDisplay {request} style="margin-right: 10px; margin-bottom: 10px;" />
        <form>
            <button on:click={e => {e.preventDefault(); approveRequest(request);}}>Approve</button>
            <button on:click={e => {e.preventDefault(); declineRequest(request);}}>Decline</button>
        </form>
    </div>
    {/each}


