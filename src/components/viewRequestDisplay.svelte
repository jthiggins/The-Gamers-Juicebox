<script>
    import { stores } from '@sapper/app';
	const { preloading, page, session } = stores();
    export let request;
</script>

<style>
    #container {
        border: 1px solid black;
    }
    #deleteComment {
        cursor: pointer;
        color: blue;
    }
</style>

<div id="container">
    {#if request}
        <p>{new Date(request.requestDate).toLocaleDateString()}</p>
        <p>{request.description}</p>
        <p id="acceptRequest" on:click={acceptRequest(request)}>Accept Request</p>
        <p id="declineRequest" on:click={declineRequest(request)}>Decline Request</p>
    {/if}
</div>
