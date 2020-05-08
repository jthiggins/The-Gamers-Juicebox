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
        <p>{request.requestDate}</p>
        <p>{request.title}</p>
	<p>{request.platform}</p>
	<p>{request.publisher}</p>
	<p>{request.genre}</p>
	<p>{request.imgSrc}</p>
        <p id="acceptRequest" on:click={acceptRequest(request)}>Accept Request</p>
        <p id="declineRequest" on:click={declineRequest(request)}>Decline Request</p>
    {/if}
</div>
