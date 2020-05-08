<svelte:head>
    <title>Browse Games - The Gamer's Juicebox</title>
</svelte:head>

<script context="module">
    export async function preload(page, session) {
          const gamesFetch = await this.fetch('/gameBrowse');
          const games = await gamesFetch.json();
          return { games };
    }
</script>

<script>
    import { onMount } from 'svelte';
    import GameDisplay from '../components/GameDisplay.svelte';
    //import games from './_games';
    export let games;
	let gamesEdit = games;
	let gamesRelate = [];
	let container;

	let sortPick;
	let plat;
	let price;
	let searchText = "";
	let description;
	let title;

    onMount(() => {
        const { top } = container.getBoundingClientRect();
        container.style.height = `calc(96vh - ${top}px)`;
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
			var platFilt = games.filter(function(platGames) {return platGames.platform == plat;});
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
				return searchGames.description.search(searchText) != -1 
					|| searchGames.title.search(searchText) != -1;
			});
			relate();
		} else {
			gamesRelate = [];
		}
		
		gamesEdit = gamesEdit;
	}

	function relate() {
		if (Array.isArray(gamesEdit) && gamesEdit.length != games.length) {
			gamesRelate = games.filter(function(relateGames) {return relateGames != gamesEdit[0] && relateGames.genre == gamesEdit[0].genre;});
		}
		//alert(gamesRelate);
	}
</script>

<style>
    .display-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
	#container {
		overflow-y: scroll;
	}
	#search {
		margin-bottom: 10px;
	}
</style>

<h1 class="center">Browse Games</h1>

<div id="search" class="center"> 
	<select id="sortSelect" bind:value={sortPick}>
		<option value="0" selected>Sort...</option>
		<option value="A">A-Z</option>
		<option value="Z">Z-A</option>
		<option value="$">$-$$$</option>
		<option value="$$$">$$$-$</option>
	</select>
	<select id="platSelect" bind:value={plat}>
		<option value="0" selected>Platform...</option>
		<option value="XBox">XBox</option>
		<option value="PlayStation">PlayStation</option>
		<option value="Nintendo Switch">Nintendo Switch</option>
	</select>
	<select id="priceSelect" bind:value={price}>
		<option value="0" selected>Price Range...</option>
		<option value="1">$0-$15</option>
		<option value="2">$15-$30</option>
		<option value="3">$30+</option>
	</select>
	<input id="searchInput" name="searchInput" bind:value={searchText} type="text">
	<button id="go" on:click={sortGames}>Go</button>
</div>

<div id="container" bind:this={container}>
	<div class="display-container" id="display">
		{#each gamesEdit as game}
		<GameDisplay {game} style="margin-right: 10px; margin-bottom: 10px;" expandable={true}/>
		{/each}
	</div>

	{#if gamesRelate.length}
	<h1 class="center">Related Search</h1>

	<div class="display-container">
		{#each gamesRelate as game}
		<GameDisplay {game} style="margin-right: 10px; margin-bottom: 10px;" expandable={true}/>
		{/each}
	</div>
	{/if}
</div>

<a href="request">Don't see your favorite game? Request to add it to our site</a>
