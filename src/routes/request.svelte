<svelte:head>
    <title>Browse Games - The Gamer's Juicebox</title>
</svelte:head>

<script>
    import { onMount } from 'svelte';

    onMount(() => {
        const { top } = container.getBoundingClientRect();
        container.style.height = `calc(98vh - ${top}px)`;
    });
	
	function sendRequest() {
		alert("Thanks for your request, sending you back to browse");
		window.location = '/browse';
	}

</script>


<h1 class="center">Request a game</h1>

<div style="border: solid black 1px; margin:20px; padding:20px">
<form>
<div style="margin-bottom: 10px">
<label for="gName">Game Name</label>
<input type="text" required id="gName" name="gName">
</div>

<div style="margin-bottom: 10px">
<label for="pName">Publisher</label>
<input type="text" required id="pName" name="pName">
</div>

<div style="margin-bottom: 10px">
<label for="releaseD">Release Date</label>
<input type="text" required id="releaseD" name="releaseD">
</div>

<div style="margin-bottom: 10px">
<button id="submitButton" on:click={sendRequest}>Submit</button>
</div>

</form>
</div>