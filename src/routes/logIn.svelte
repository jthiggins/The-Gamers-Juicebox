<svelte:head>
    <title>Browse Games - The Gamer's Juicebox</title>
    <script src="dbApi.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    onMount(() => {
        const { top } = container.getBoundingClientRect();
        container.style.height = `calc(98vh - ${top}px)`;
    });
    
    function validateUser() {
        alert("Testing");
        var userId = document.getElementById("uName");
        var pw = document.getElementById("pass");
        var validUser = validateLogin(userId.value, pw.value);
        if (validUser = true) {
             window.location = '/browse';
        }
        else {
            alert("Invalid username or password");
        }
    }
</script>

<h1 class="center">Log In To Your Account</h1>
<div style="border: solid black 1px; margin:20px; padding:20px">
<form>

<div style="margin-bottom: 10px">
<label for="uName">User Name</label>
<input type="text" required pattern="([A-Za-z0-9]+)\s*" id="uName" name="uName">
</div>

<div style="margin-bottom: 10px">
<label for="pass">Password</label>
<input type="password" required id="pass" name="pass">
</div>

<div style="margin-bottom: 10px">
<button on:click={() => validateUser()}> Log In </button>
</div>
</form>
<a href="register">Don't have an account? Create one here</a>
</div>
