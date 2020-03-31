<script>
    import Header from '../components/Header.svelte';

    // External variable supplied by Sapper
    export let segment;
</script>

<Header {segment}/>

<slot></slot>