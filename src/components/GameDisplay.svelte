<script>
    import { fade } from 'svelte/transition';
    export let game;
    export let expandable = false;
    export let fullyExpanded = false;
    export let style = '';
    export let expandedBackgroundColor = 'white';
    export let showCommentsLink = true;

    let expanded = false;

    function expand() {
        expanded = true;
    }

    function contract(e) {
        expanded = false;
        // Needed to prevent click handler being called on the normal container when in expanded view
        e.stopPropagation();
    }
</script>

<style>
    .expanded-background {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
    }
    .expanded-game-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 400px;
        padding: 5px;
        z-index: 1000;
    }
    .game-container {
        border: 1px solid black;
        font-size: 16pt;
        width: 200px;
        padding: 5px;
        position: relative;
    }
    .placeholder {
        width: 150px;
        height: 250px;
        border: 2px dashed gray;
        text-align: center;
    }
    .placeholder p {
        color: gray;
        font-size: 24pt;
        font-weight: bold;
        margin-top: 50px;
    }
    img {
        width: 100%;
    }
</style>

{#if game}
    <div class="game-container" {style} on:click={expand}>
        {#if expandable && expanded}
            <div class="expanded-background" on:click={contract} transition:fade></div>
            <div class="expanded-game-container" on:click={contract} transition:fade style="background-color: {expandedBackgroundColor}">
                <img src={game.imgSrc} alt="Cover art of {game.title}"/>
                <div style="margin-top: 10px">
                    <strong>{game.title}</strong>
                </div>
                <div>
                    <p>Description: {game.description}</p>
                </div>
                <div>
                    <p>Genre: {game.genre}</p>
                </div>
                <div>
                    <p>Publisher: {game.publisher}</p>
                </div>
                <div>
                    <p>Platforms: {game.platform}</p>
                </div>
                <div>
                    <p>Price: ${game.price}</p>
                </div>
                {#if showCommentsLink}
                    <div>
                        <a href={`/comments/${game.gameId}`}>View Comments For This Game</a>
                    </div>
                {/if}
            </div>
        {/if}
        <img src={game.imgSrc} alt="Cover art of {game.title}"/>
        <div style="margin-top: 10px">
            <strong>{game.title}</strong>
        </div>
        {#if fullyExpanded}
            <div>
                <p>Description: {game.description}</p>
            </div>
            <div>
                <p>Genre: {game.genre}</p>
            </div>
            <div>
                <p>Publisher: {game.publisher}</p>
            </div>
            <div>
                <p>Platforms: {game.platform}</p>
            </div>
        {/if}
        <div>
            <p>${game.price}</p>
        </div>
        {#if showCommentsLink}
            <div>
                <a href={`/comments/${game.gameId}`}>View Comments For This Game</a>
            </div>
        {/if}
    </div>
{:else}
    <div class="placeholder" {style}>
        <p>Insert game here</p>
    </div>
{/if}