<script>
  let first = "";
  let last = "";
  let email = "";
  let userId = "";
  let pw = "";
  let errorMessage;

  function createAccount() {
    fetch("/register", {
      method: "POST",
      redirect: "manual",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: first,
        lastName: last,
        email,
        username: userId,
        password: pw
      })
    }).then(res => {
      if (res.status === 200) {
        fetch("/login", {
          method: "POST",
          redirect: "manual",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: userId,
            password: pw
          })
        }).then(res => {
          if (res.status === 401) {
            errorMessage.innerHTML =
              "Your account was registered, but we couldn't log you in. Go to the <a href='/logIn'>login page</a> to log in.";
            errorMessage.style.display = "block";
          } else if (res.status === 0) {
            window.location.href = "/";
          }
        });
      } else {
        errorMessage.innerHTML =
          "The username or email you entered is already taken.";
        errorMessage.style.display = "block";
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
<h1 class="center">Register Account</h1>

<div style="border: solid black 1px; margin:20px; padding:20px">
  <form>
    <div style="margin-bottom: 10px">
      <label for="fName">First Name</label>
      <input
        type="text"
        required
        pattern="([A-Za-z]+)\s*"
        id="fName"
        name="fName"
        bind:value={first} />
    </div>

    <div style="margin-bottom: 10px">
      <label for="lName">Last Name</label>
      <input
        type="text"
        required
        pattern="([A-Za-z]+)\s*"
        id="lName"
        name="lName"
        bind:value={last} />
    </div>

    <div style="margin-bottom: 10px">
      <label for="email">Email</label>
      <input
        type="email"
        required
        id="email"
        placeholder="email@website.com"
        name="email"
        bind:value={email} />
    </div>

    <div style="margin-bottom: 10px">
      <label for="uName">User Name</label>
      <input
        type="text"
        required
        pattern="([A-Za-z0-9]+)\s*"
        id="uName"
        name="uName"
        bind:value={userId} />
    </div>

    <div style="margin-bottom: 10px">
      <label for="pass">Password</label>
      <input type="password" required id="pass" name="pass" bind:value={pw} />
    </div>

    <div style="margin-bottom: 10px">
      <button
        id="submitButton"
        on:click={e => {
          e.preventDefault();
          createAccount();
        }}>
        Create Account
      </button>
    </div>
  </form>
  <p id="errorMessage" bind:this={errorMessage} />
</div>
