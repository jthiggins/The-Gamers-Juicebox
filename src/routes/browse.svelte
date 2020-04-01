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

function sortGames(sortPick) {
alert(sortPick);
	if (sortPick == "0"){
		games.sort(compareValues('title'));
		alert("fuc");
	}
	if (sortPick === "A"){
		games.sort(compareValues('title'));
	}
	if (sortPick === "Z"){
		games.sort(compareValues('title', 'desc'));
	}
	if (sortPick === "$"){
		games.sort(compareValues('price'));
	}
	if (sortPick === "$$$"){
		games.sort(compareValues('price', desc));
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

<select onChange="sortGames(this.value)" id="sortDrop">
	<option value="0" selected>Sort...</option>
    <option value="A">A-Z</option>
	<option value="Z">Z-A</option>
	<option value="$">$-$$$</option>
	<option value="$$$">$$$-$</option>
</select>


<div id="display" bind:this={container}>
    {#each games as game}
    <GameDisplay {game} style="margin-right: 10px; margin-bottom: 10px;"/>
    {/each}
</div>