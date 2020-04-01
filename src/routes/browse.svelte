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
	
	/* Dropdown Button */
.dropbtn {
  background-color: #3498DB;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* Dropdown button on hover & focus */
.dropbtn:hover, .dropbtn:focus {
  background-color: #2980B9;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #ddd}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {display:block;}
</style>

<h1 class="center">Browse Games</h1>

<select id="sort">
    <option onclick="sortGames(A)">A-Z</a>
	<option onclick="sortGames(Z)">Z-A</a>
	<option onclick="sortGames($)">$-$$$</a>
	<option onclick="sortGames($$$)">$$$-$</a>
</select>

<div bind:this={container}>
    {#each games as game}
    <GameDisplay {game} style="margin-right: 10px; margin-bottom: 10px;"/>
    {/each}
</div>