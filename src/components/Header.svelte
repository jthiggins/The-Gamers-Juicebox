<script>
    import { onMount } from 'svelte';

    export let segment;
    
    let header;
    
    onMount(() => {
        const { top, left } = header.getBoundingClientRect();
        header.style.top = -top + 'px';
        header.style.left = -left + 'px';
    });

    function goToHomePage() {
        // Avoid redirecting if segment is undefined (i.e. the user is already on the home page)
        if (segment) {
            window.location = '/';
        }
    }

    function goToLogInPage() {
        window.location = '/logIn';
    }

</script>

<style>
    header {
        display: flex;
        vertical-align: middle;
        flex-direction: row;
        box-shadow: 0px 0px 10px 2px gray;
        position: relative;
        width: 100vw;
        justify-content: space-between;
        background-color: black;
        color: white;
    }
    h1:hover {
        cursor: pointer;
    }
    button {
        margin-right: 10px;
        border-radius: 2px;
        border: none;
        font-size: 18pt;
        background-color: white;
        color: black;
        box-shadow: 0px 0px 5px gray;
        padding-bottom: 2px;
        font-family: 'Lato', sans-serif; 
    }
    button:hover {
        cursor: pointer;
        background-color: #ebebeb;
        box-shadow: inset 0px 0px 3px gray;
    }
    .center-align {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>

<header bind:this={header}>
    <div style="margin-left: 10px;">
        <h1 on:click={goToHomePage}>The Gamer's Juicebox</h1>
    </div>
    <div class="center-align">
        <button type="button" id="toLogin" on:click={goToLogInPage} >Log In</button>
    </div>
</header>
