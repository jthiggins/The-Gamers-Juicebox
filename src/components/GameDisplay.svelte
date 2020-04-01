<script>
    export let game;
    export let style = '';
</script>

<style>
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
<div class="game-container" {style}>
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
<div class="placeholder" {style}>
    <p>Insert game here</p>
</div>
{/if}