<svelte:head>
    <title>Browse Games - The Gamer's Juicebox</title>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import GameDisplay from '../components/GameDisplay.svelte';
    import games from './_games';
    let container;
    onMount(() => {
        const { top } = container.getBoundingClientRect();
        container.style.height = `calc(98vh - ${top}px)`;
    });
	
/*function sortGames(by) {
	if (by == "A"){
		games.title.sort();
	}
	if (by == "Z"){
		games.title.sort();
		games.title.reverse()
	}
	if (by == "A"){
		games.price.sort(function(a, b){return a - b});
	}
	if (by == "A"){
		games.price.sort(function(a, b){return b - a});
	}
}*/
</script>

<style>
    div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        overflow-y: scroll;
    }

</style>

<h1 class="center">Browse Games</h1>

/*<select id="sort">
    <option value="A">A-Z</a>
	//<option onclick="sortGames(Z)">Z-A</a>
	//<option onclick="sortGames($)">$-$$$</a>
	//<option onclick="sortGames($$$)">$$$-$</a>
</select>*/

<div bind:this={container}>
    {#each games as game}
    <GameDisplay {game} style="margin-right: 10px; margin-bottom: 10px;"/>
    {/each}
</div>