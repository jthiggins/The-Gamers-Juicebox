<script>
    import { stores } from '@sapper/app';
	const { preloading, page, session } = stores();
    export let request;
</script>

<style>


</style>


    {#if request}
        <div id="container">
            <div>
                <p><strong>Date Requested: </strong>{new Date(request.requestDate).toLocaleDateString()}</p>
            </div>
            <div>
                <p><strong>Game Title: </strong>{request.title}</p>
            </div>
            <div>
                <p><strong>Price: </strong>{request.price}</p>
            </div>
            <div>
                <p><strong>Description: </strong>{request.description}</p>
            </div>
            <div>
                <p><strong>Platform: </strong>{request.platform}</p>
            </div>
            <div>
                <p><strong>Publisher: </strong>{request.publisher}</p>
            </div>
            <div>
                <p><strong>Genre: </strong>{request.genre}</p>
            </div>
            <div>
                <p><strong>Image Source: </strong>{request.imgSrc}</p>
            </div>
        </div>
    {/if}

