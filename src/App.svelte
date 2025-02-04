<script>
    import { onMount } from "svelte";
    import { user, getCurrentUser } from "./sharedAuth.svelte";
    import Auth from "./lib/Login.svelte";
    import Catalog from "./lib/Catalog.svelte";

    onMount(() => {
        getCurrentUser();
    });
</script>

<main>
    {#if user.isAuthenticated}
        <Catalog />
    {:else}
        <Auth />
    {/if}
</main>
