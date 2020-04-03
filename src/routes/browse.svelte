<svelte:head>
    <title>Browse Games - The Gamer's Juicebox</title>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import GameDisplay from '../components/GameDisplay.svelte';
    import games from './_games';
	var gamesEdit = games;
	let container;
	
	let sortPick;
	let plat;
	let price;
	let searchText = "";
	let description;
	let title;

    onMount(() => {
        const { top } = container.getBoundingClientRect();
        container.style.height = `calc(98vh - ${top}px)`;
    });
	
	function compareValues(key, order = 'asc') {
		return function innerSort(a, b) {
			if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
			// property doesn't exist on either object
			return 0;
			}

			const varA = (typeof a[key] === 'string')
			? a[key].toUpperCase() : a[key];
			const varB = (typeof b[key] === 'string')
			? b[key].toUpperCase() : b[key];

			let comparison = 0;
			if (varA > varB) {
			comparison = 1;
			} else if (varA < varB) {
			comparison = -1;
			}
			return (
			(order === 'desc') ? (comparison * -1) : comparison
			);
		};
	}

	function sortGames() {
		gamesEdit = games;

		if (sortPick === "A"){
			gamesEdit.sort(compareValues('title'));
		}
		if (sortPick === "Z"){
			gamesEdit.sort(compareValues('title', 'desc'));
		}
		if (sortPick === "$"){
			gamesEdit.sort(compareValues('price'));
		}
		if (sortPick === "$$$"){
			gamesEdit.sort(compareValues('price', 'desc'));
		}
		
		if (plat != "0") {
			var platFilt = games.filter(function(platGames) {return platGames.platforms == plat;});
			gamesEdit = platFilt;
		}
		
		var priceFilt;
		if (price === "1"){
			priceFilt = gamesEdit.filter(function(priceGames) {return priceGames.price < 15;});
			gamesEdit = priceFilt;
		}
		if (price === "2"){
			priceFilt = gamesEdit.filter(function(priceGames) {return priceGames.price < 30;});
			gamesEdit = priceFilt.filter(function(priceGames) {return priceGames.price > 15;});
		}
		if (price === "3"){
			priceFilt = gamesEdit.filter(function(priceGames) {return priceGames.price > 30;});
			gamesEdit = priceFilt;
		}
		
		if (searchText != "") {
			gamesEdit = gamesEdit.filter(function(searchGames) {
				console.log(searchGames)
				return searchGames.description.search(searchText) != -1 
					|| searchGames.title.search(searchText) != -1;
			});
		}
		
		gamesEdit = gamesEdit;
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
	<select bind:value={sortPick}>
		<option value="0" selected>Sort...</option>
		<option value="A">A-Z</option>
		<option value="Z">Z-A</option>
		<option value="$">$-$$$</option>
		<option value="$$$">$$$-$</option>
	</select>
	<select bind:value={plat}>
		<option value="0" selected>Platform...</option>
		<option value="XBox">XBox</option>
		<option value="PlayStation">PlayStation</option>
		<option value="Nintendo Switch">Nintendo Switch</option>
	</select>
	<select bind:value={price}>
		<option value="0" selected>Price Range...</option>
		<option value="1">$0-$15</option>
		<option value="2">$15-$30</option>
		<option value="3">$30+</option>
	</select>
	<input bind:value={searchText} type="text">
	<button on:click={sortGames}>Go</button>
</div>


<div id="display" bind:this={container}>
    {#each gamesEdit as game}
    <GameDisplay {game} style="margin-right: 10px; margin-bottom: 10px;"/>
    {/each}
</div>
