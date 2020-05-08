<svelte:head>
    <title>Browse Games - The Gamer's Juicebox</title>
</svelte:head>

<script context="module">
    export async function preload(page, session) {
        //const requests = await this.fetch('/requests').then(res => res.json());
        return {
            session
        };
    }
</script>

<script>
    export let session;
    let name = "";
    let pr = "";
    let plat = "";
    let desc = "";
    let pub = "";
    let gen = "";
    let img = "";
    let errorMessage;
    let form;

	function sendRequest() {
	    if(session.user) {
            fetch("/request", {
              method: "POST",
              redirect: "manual",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                userId: session.user,
                title: name,
                price: pr,
                platform: plat,
                description: desc,
                publisher: pub,
                genre: gen,
                imgSrc: img
              })
            }).then(res => {
                if (res.status === 200){
                    form.innerHTML = "Thanks for your request, it will be reviewed by an administrator";
                    form.style.display = "block";
                } else {
                    errorMessage.innerHTML =
                        "There was an error in submitting your request. Try again.";
                    errorMessage.style.display = "block";
                }
            });
	    } else {
	        errorMessage.innerHTML =
                "You have to be a user to request games. Please log in or sign up";
            errorMessage.style.display = "block";
	    }
	}

</script>

<style>
  #errorMessage {
    color: red;
    display: none;
  }
</style>

<h1 class="center">Request a game</h1>

<div style="border: solid black 1px; margin:20px; padding:20px">
<form bind:this={form}>
<div style="margin-bottom: 10px">
<label for="gName">Title</label>
<input type="text" required id="title" name="title" bind:value={name}>
</div>

<div style="margin-bottom: 10px">
<label for="gName">Price</label>
<input type="text" required id="price" name="price" bind:value={pr}>
</div>

<div style="margin-bottom: 10px">
<label for="gName">Platform</label>
<input type="text" required id="platform" name="platform" bind:value={plat}>
</div>

<div style="margin-bottom: 10px">
<label for="gName">Description</label>
<input type="text" required id="description" name="description" bind:value={desc}>
</div>

<div style="margin-bottom: 10px">
<label for="pName">Publisher</label>
<input type="text" required id="pName" name="pName" bind:value={pub}>
</div>

<div style="margin-bottom: 10px">
<label for="gName">Genre(s)</label>
<input type="text" required id="genre" name="genre" bind:value={gen}>
</div>

<div style="margin-bottom: 10px">
<label for="gName">Image Link</label>
<input type="text" required id="imgLink" name="imgLink" bind:value={img}>
</div>

<div style="margin-bottom: 10px">
<button id="submitButton" on:click={e => {e.preventDefault(); sendRequest();}}>Submit</button>
</div>

</form>
<p id="errorMessage" bind:this={errorMessage} />
</div>