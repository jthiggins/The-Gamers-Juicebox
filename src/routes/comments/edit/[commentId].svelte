<script context="module">
    export async function preload(page, session) {
        const { commentId } = page.params;
        const comments = await this.fetch('/comments').then(res => res.json());
        return {
            comment: comments.filter(comment => comment.commentId == commentId)[0],
            session
        };
    }
</script>

<script>
    export let comment;
    export let session;

    let error;
    let newCommentText = comment.description;

    function showError(errorMessage) {
        error.innerText = String(errorMessage);
        error.style.display = "block";
    }

    async function editComment() {
        if (!session.user || (!session.user.isModerator && session.user.id != comment.userId)) {
            showError("You do not have permission to edit this comment.");
            return;
        }
        if (newCommentText === "") {
            showError("You cannot post an empty comment.");
            return;
        }
        try {
            const res = await fetch('/comments', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: comment.userId,
                    commentId: comment.commentId,
                    gameId: comment.gameId,
                    description: newCommentText
                })
            });
            if (res.ok) {
                window.location = `/comments/${comment.gameId}`;
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

<h1 class="center">Edit Comment</h1>

<div id="error" bind:this={error}></div>
{#if session.user && (session.user.isModerator || session.user.id === comment.userId)}
    <form>
        <textarea bind:value={newCommentText}></textarea>
        <button on:click={e => {e.preventDefault(); editComment();}}>Edit</button>
    </form>
{:else}
    <p>You do not have permission to edit this comment.</p>
{/if}