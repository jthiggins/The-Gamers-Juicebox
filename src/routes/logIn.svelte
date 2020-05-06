<script>
  let username = "";
  let password = "";
  let errorMessage;
  function validateUser() {
    fetch("/login", {
      method: "POST",
      redirect: "manual",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      if (res.status === 401) {
        errorMessage.innerHTML = "Incorrect username or password.";
        errorMessage.style.display = "block";
      } else if (res.status === 0) {
        window.location.href = "/";
      }
    });
  }
</script>

<style>
  #errorMessage {
    color: red;
    display: none;
  }
</style>

<svelte:head>
  <title>Browse Games - The Gamer's Juicebox</title>
</svelte:head>
<h1 class="center">Log In To Your Account</h1>
<div style="border: solid black 1px; margin:20px; padding:20px">
  <form onsubmit="">
    <div style="margin-bottom: 10px">
      <label for="uName">User Name</label>
      <input
        type="text"
        required
        pattern="([A-Za-z0-9]+)\s*"
        id="uName"
        name="uName"
        bind:value={username} />
    </div>

    <div style="margin-bottom: 10px">
      <label for="pass">Password</label>
      <input
        type="password"
        required
        id="pass"
        name="pass"
        bind:value={password} />
    </div>

    <div style="margin-bottom: 10px">
      <button
        on:click={e => {
          e.preventDefault();
          validateUser();
        }}>
        Log In
      </button>
    </div>
  </form>
  <p id="errorMessage" bind:this={errorMessage} />
  <a href="register" id="goToReg">Don't have an account? Create one here</a>
</div>
