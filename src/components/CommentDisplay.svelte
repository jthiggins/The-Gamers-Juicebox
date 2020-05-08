<script>
    import { stores } from '@sapper/app';
	const { preloading, page, session } = stores();
    export let comment;
</script>

<style>
    #container {
        border: 1px solid black;
    }
</style>

<div id="container">
    {#if comment}
        {#if $session.user && comment.userId == $session.user.id}
            <a href={`/comments/edit/${comment.commentId}`}>Edit Comment</a>
        {/if}
        <p>{new Date(comment.commentDate).toLocaleDateString()}</p>
        <p>{comment.description}</p>
    {:else}
        <p>Could not load comment.</p>
    {/if}
</div>