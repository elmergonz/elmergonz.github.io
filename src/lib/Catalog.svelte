<script>
    import { onMount } from "svelte";
    import { user, signOut } from "../sharedAuth.svelte";
    import { supabase } from "../supabaseClient";

    let products = $state([]);
    let productName = $state("");

    onMount(() => {
        getProducts();
    });

    async function getProducts() {
        const { data, error } = await supabase.from("product").select();

        products = data;
    }

    async function addProduct() {
        if (!productName) {
            alert("Debes insertar un producto, amor :3");
            return;
        }

        const { data, status, error } = await supabase
            .from("product")
            .insert({ name: productName })
            .select();

        if (status === 201) {
            getProducts();
            productName = "";
        }
    }

    async function deleteProduct(id) {
        const response = await supabase.from("product").delete().eq("id", id);

        if (response.status === 204) {
            products = products.filter((product) => product.id != id);
        }
    }
</script>

<p>
    User: <span id="user-logged">
        {user.name}

        {#if user.isAnon}
            <input
                type="button"
                value="login"
                onclick={() => location.reload()}
            />
        {:else}<input
                type="button"
                value="logout"
                onclick={signOut}
            />
        {/if}
    </span>
</p>

<div id="catalog-section">
    <h2>Catalog</h2>

    {#if !user.isAnon}
        <div id="add-product-section">
            <label for="product-input">Add product: </label>
            <input
                id="product-input"
                name="product-input"
                type="text"
                bind:value={productName}
            />
            <input type="button" value="add" onclick={addProduct} />
        </div>
    {/if}

    <ul id="product-list">
        {#each products as product}
            <li id={`product-${product.id}`}>
                {product.name}
                {#if !user.isAnon}
                    <input
                        type="button"
                        value="delete"
                        onclick={deleteProduct(product.id)}
                    />
                {/if}
            </li>
        {/each}
    </ul>
</div>
