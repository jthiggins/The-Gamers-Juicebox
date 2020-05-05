<svelte:head>
    <title>Browse Games - The Gamer's Juicebox</title>
</svelte:head>

<script>    
    let username = "";
    let password = "";
    function validateUser() {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(res => res.json())
        .then(console.log);
    }
</script>

<h1 class="center">Log In To Your Account</h1>
<div style="border: solid black 1px; margin:20px; padding:20px">
<form onsubmit="">
    <div style="margin-bottom: 10px">
        <label for="uName">User Name</label>
        <input type="text" required pattern="([A-Za-z0-9]+)\s*" id="uName" name="uName" bind:value={username}>
    </div>

    <div style="margin-bottom: 10px">
        <label for="pass">Password</label>
        <input type="password" required id="pass" name="pass" bind:value={password}>
    </div>

    <div style="margin-bottom: 10px">
        <button role="button" on:click={(e) => {e.preventDefault(); validateUser();}}> Log In </button>
    </div>
</form>
<a href="register" id="goToReg">Don't have an account? Create one here</a>
</div>
