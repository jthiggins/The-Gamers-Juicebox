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
	
function drop() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function sortGames(by) {
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

<div class="dropdown">
  <button onclick="drop()" class="dropbtn">Dropdown</button>
  <div id="myDropdown" class="dropdown-content">
    <a onclick="sortGames(A)">A-Z</a>
	<a onclick="sortGames(Z)">Z-A</a>
	<a onclick="sortGames($)">$-$$$</a>
	<a onclick="sortGames($$$)">$$$-$</a>
  </div>
</div>

<div bind:this={container}>
    {#each games as game}
    <GameDisplay {game} style="margin-right: 10px; margin-bottom: 10px;"/>
    {/each}
</div>
