<svelte:head>
    <title>Browse Games - The Gamer's Juicebox</title>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import GameDisplay from '../components/GameDisplay.svelte';
    import games from './_games';
	// import Select from './svelte-select'
    let container;

    onMount(() => {
        const { top } = container.getBoundingClientRect();
        container.style.height = `calc(98vh - ${top}px)`;
    });
	
	/* const sortItems = [
	{value: 'A', label: 'A-Z', group: 'Title'},
    {value: 'Z', label: 'Z-A', group: 'Title'},
    {value: '$', label: '$-$$$', group: 'Price'},
    {value: '$$$', label: '$$$-$', group: 'Price'},
	]; */
	
	let selectedValue = undefined;

if (selectedValue != undefined) {
	if (selectedValue == "A"){
		games.title.sort();
		document.getElementById("display").reload();
	}
	if (selectedValue == "Z"){
		games.title.sort();
		games.title.reverse()
	}
	if (selectedValue == "A"){
		games.price.sort(function(a, b){return a - b});
	}
	if (selectedValue == "A"){
		games.price.sort(function(a, b){return b - a});
	}
}

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

<div>
	<h2>Sort</h2>
	<Select {sortItems} bind:selectedValue></Select>
</div>

<div id="display" bind:this={container}>
    {#each games as game}
    <GameDisplay {game} style="margin-right: 10px; margin-bottom: 10px;"/>
    {/each}
</div>
