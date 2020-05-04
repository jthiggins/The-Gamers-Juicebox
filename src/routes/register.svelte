<svelte:head>
    <title>Browse Games - The Gamer's Juicebox</title>
</svelte:head>

<script>
    import { onMount } from 'svelte';

    onMount(() => {
        const { top } = container.getBoundingClientRect();
        container.style.height = `calc(98vh - ${top}px)`;
    });
</script>

<script src="dbApi.js"></script>

<script>
    function createAccount() {
	var first = document.getElementById("fName");
	var last = document.getElementById("lName");
        var userId = document.getElementById("uName");
        var pw = document.getElementById("pass");
        var validUser = addUpdateDeleteUsers(0, first.value, last.value, userId.value, pw.value, false);
        if (validUser != -1) {
             window.location = '/logIn';
        }
        else {
            alert("Username or email already exists");
        }
    }
</script>


<h1 class="center">Register Account</h1>

<div style="border: solid black 1px; margin:20px; padding:20px">
<form>
<div style="margin-bottom: 10px">
<label for="fName">First Name</label>
<input type="text" required pattern="([A-Za-z]+)\s*" id="fName" name="fName">
</div>

<div style="margin-bottom: 10px">
<label for="lName">Last Name</label>
<input type="text" required pattern="([A-Za-z]+)\s*" id="lName" name="lName">
</div>

<div style="margin-bottom: 10px">
<label for="email">Email</label>
<input type="email" required id="email" placeholder="email@website.com" name="email">
</div>

<div style="margin-bottom: 10px">
<label for="uName">User Name</label>
<input type="text" required pattern="([A-Za-z0-9]+)\s*" id="uName" name="uName">
</div>

<div style="margin-bottom: 10px">
<label for="pass">Password</label>
<input type="password" required id="pass" name="pass">
</div>

<div style="margin-bottom: 10px">
<input id="submitButton" type="submit" value="Submit" onClientClick="return createAccount()>
</div>
</form>
</div>
