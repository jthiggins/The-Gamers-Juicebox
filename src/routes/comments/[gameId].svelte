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
        console.log(comments);
        return {
            game,
            comments
        };
    }
</script>

<script>
    import CommentDisplay from '../../components/CommentDisplay.svelte';
    import GameDisplay from '../../components/GameDisplay.svelte';
    export let game;
    export let comments;
</script>

{#if game}
<h1>Comments for {game.title}</h1>
<GameDisplay {game} expandable={true} />
{#each comments as comment}
<CommentDisplay {comment} />
{/each}
{:else}
<h1>Game Not Found</h1>
{/if}