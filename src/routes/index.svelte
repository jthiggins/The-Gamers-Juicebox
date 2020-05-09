<svelte:head>
    <title>Home - The Gamer's Juicebox</title>
</svelte:head>

<script context="module">
    export async function preload(page, session) {
        const gamesFetch = await this.fetch('/indexGames');
        const games = await gamesFetch.json();
        return { games };
    }
</script>

<script>
    import GameDisplay from '../components/GameDisplay.svelte';
    export let games;
</script>

<style>
    .row {
        display: flex;
        flex-direction: row;
    }
    a {
        font-size: 18pt;
        color: #3542b9;
    }
    a:hover {
        color: #9299db;
    }
    h1 {
        font-size: 32pt;
    }
</style>

<section>
    <h1 class="center">Welcome to the Juicebox</h1>
    <p>
        The Gamer's Juicebox is your place to go whenever you want to look up information on a game. Wondering what platform your favorite 
        game is on? Curious about the price of that game you saw your friend playing? Or maybe you just want to check out what's new?
        The Juicebox has all you want and more!
    </p>
</section>

<section>
    <h2>Most Recent Games</h2>
    <div class="row">
        {#each games as game}
        <GameDisplay style="margin-right: 10px"/>
        {/each}
    </div>
    <div style="margin-top: 10px">
        <a href="browse" id="toBrowse">Browse All Games</a>
    </div>
</section>