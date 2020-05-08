<script context="module">
    export async function preload(page, session) {
        const { gameId } = page.params;
        const games = await this.fetch('/games').then(res => res.json());
        let game;
        for (const gameTmp of games) {
            if (gameTmp.gameId == gameId) {
                game = gameTmp;
            }
        }
        const comments = await this.fetch(`/comments/${gameId}.json`).then(res => res.json());
        return {
            game,
            comments,
            session
        };
    }
</script>

<script>
    import CommentDisplay from '../../components/CommentDisplay.svelte';
    import GameDisplay from '../../components/GameDisplay.svelte';
    export let game;
    export let comments;
    export let session;

    let error;
    let newCommentText = "";

    function showError(errorMessage) {
        error.innerText = String(errorMessage);
        error.style.display = "block";
    }

    async function submitComment() {
        if (!session.user) {
            showError("You need to be logged in to post a comment.");
            return;
        }
        if (!game) {
            showError("Game not found.");
            return;
        }
        if (newCommentText === "") {
            showError("You cannot post an empty comment.");
            return;
        }
        try {
            const res = await fetch('/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameId: game.gameId,
                    description: newCommentText
                })
            });
            if (res.ok) {
                newCommentText = "";
                comments = await fetch(`/comments/${game.gameId}.json`).then(res => res.json());
            } else {
                showError(await res.text());
            }
        } catch (err) {
            showError(err);
        }
    }

    async function deleteComment(comment) {
        if (!confirm("Are you sure you want to delete this comment?")) {
            return;
        }
        if (!session.user || (!session.user.isModerator && comment.userId != session.user.id)) {
            showError("You do not have permission to delete this comment.");
            return;
        }
        try {
            const res = await fetch('/comments', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: comment.userId,
                    commentId: comment.commentId,
                    gameId: comment.gameId
                })
            });
            if (res.ok) {
                comments = await fetch(`/comments/${game.gameId}.json`).then(res => res.json());
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

{#if game}
    <h1>Comments for {game.title}</h1>
    <GameDisplay {game} expandable={true} />
    {#each comments as comment}
        <CommentDisplay {comment} {deleteComment} />
    {/each}
    {#if session.user}
        <form>
            <textarea bind:value={newCommentText}></textarea>
            <button on:click={e => {e.preventDefault(); submitComment();}}>Post</button>
        </form>
    {/if}
{:else}
    <h1>Game Not Found</h1>
{/if}