<script>
    import { onMount, beforeUpdate, afterUpdate } from 'svelte';
    import { fade } from 'svelte/transition';
    export let game;
    export let expandable = false;
    export let style = '';
    export let expandedBackgroundColor = 'white';

    let normalContainer;
    let expandedContainer;
    let expanded = false;
    let offsetTop = 0;
    let offsetLeft = 0;

    onMount(() => {
        if (normalContainer) {
            offsetLeft = normalContainer.offsetLeft;
            offsetTop = normalContainer.offsetTop;
        }
    });

    beforeUpdate(() => {
        if (normalContainer) {
            offsetLeft = normalContainer.offsetLeft;
            offsetTop = normalContainer.offsetTop;
        }
    });

    afterUpdate(() => {
        if (expandedContainer) {
            expandedContainer.style.left = offsetLeft + 'px';
            expandedContainer.style.top = offsetTop + 'px';
        }
    });

    function expand() {
        expanded = true;
    }

    function contract() {
        expanded = false;
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
    }
    .expanded-game-container {
        position: absolute;
        width: 600px;
        padding: 5px;
    }
    .game-container {
        border: 1px solid black;
        font-size: 16pt;
        width: 400px;
        padding: 5px;
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
    {#if expandable && expanded}
        <div class="expanded-background" on:click={contract} transition:fade></div>
        <div class="expanded-game-container" on:click={contract} transition:fade style="background-color: {expandedBackgroundColor}" bind:this={expandedContainer}>
            <img src={game.imgSrc} alt="Cover art of {game.title}"/>
            <div style="margin-top: 10px">
                <strong>{game.title}</strong>
            </div>
            <div>
                <p>Description: {game.description}</p>
            </div>
            <div>
                <p>Publisher: {game.publisher}</p>
            </div>
            <div>
                <p>Platforms: {game.platforms}</p>
            </div>
            <div>
                <p>Price: {game.price}</p>
            </div>
        </div>
    {:else}
        <div class="game-container" {style} on:click={expand} transition:fade bind:this={normalContainer}>
            <img src={game.imgSrc} alt="Cover art of {game.title}"/>
            <div style="margin-top: 10px">
                <strong>{game.title}</strong>
            </div>
            <div>
                <p>{game.description}</p>
            </div>
        </div>
    {/if}
{:else}
    <div class="placeholder" {style}>
        <p>Insert game here</p>
    </div>
{/if}