<script>
    import { stores } from '@sapper/app';
	const { preloading, page, session } = stores();
    export let comment;
    export let deleteComment;
</script>

<style>
    #container {
        border: 1px solid black;
    }
    #deleteComment {
        cursor: pointer;
        color: blue;
        display: inline-block;
        margin-left: 10px;
    }
</style>

<div id="container">
    {#if comment}
        {#if $session.user && (comment.userId == $session.user.id || $session.user.isModerator)}
            <a href={`/comments/edit/${comment.commentId}`}>Edit Comment</a>
            <p id="deleteComment" on:click={deleteComment(comment)}>Delete Comment</p>
        {/if}
        <p>{new Date(comment.commentDate).toLocaleDateString()}</p>
        <p>{comment.description}</p>
    {:else}
        <p>Could not load comment.</p>
    {/if}
</div>