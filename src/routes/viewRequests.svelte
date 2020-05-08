<script context="module">
    export async function preload(page, session) {
        const requests = await this.fetch(`/viewRequests.json`).then(res => res.json());
        return {
            requests,
            session
        };
    }
</script>

<script>
    export let requests;
    let error;
    let newrequestText = "";
    function showError(errorMessage) {
        error.innerText = String(errorMessage);
        error.style.display = "block";
    }
    async function approveRequest() {
        try {
            const res = await fetch('/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requestId: gameRequests.gameRequestId,
                    isAccepted: 1
                })
            });
            if (res.ok) {
                newrequestText = "";
                requests = await fetch(`/viewRequests.json`).then(res => res.json());
            } else {
                showError(await res.text());
            }
        } catch (err) {
            showError(err);
        }
    }
    async function declineRequest() {
        try {
            const res = await fetch('/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requestId: gameRequests.gameRequestId,
                    isDeleted: 1
                })
            });
            if (res.ok) {
                newrequestText = "";
                requests = await fetch(`/viewRequests.json`).then(res => res.json());
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
        <requestDisplay {request} />
    {/each}
    <form>
    	<textarea bind:value={newrequestText}></textarea>
    	<button on:click={e => {e.preventDefault(); approveRequest();}}>Approve</button>
    	<button on:click={e => {e.preventDefault(); declineRequest();}}>Decline</button>
    </form>
