<script>
    import { onMount } from "svelte";
    import { supabase } from "./supabaseClient";

    let email = $state("");
    let password = $state("");
    let userName = $state("");
    let products = $state([]);
    let productName = $state("");

    onMount(() => {
        getCurrentUser();
        getProducts();
    });

    async function getCurrentUser() {
        const { data, error } = await supabase.auth.getUser();

        if (data.user === null) {
            userName = "Anonymous User";
        } else {
            userName = data.user.email;
        }
    }

    async function authenticate() {
        if (!email || !password) {
            alert("Debes ingresar un usuario y contraseña");
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        userName = data.user.email;
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut();

        getCurrentUser();
    }

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

<main>
    <h1>Miniature Happiness ✨</h1>

    <p>
        User: <span id="user-logged">
            {userName}

            {#if userName != "Anonymous User"}
                <input
                    type="button"
                    value="logout"
                    onclick={async () => {
                        const error = await signOut();
                        userName = error ? userName : "Anonymous User";
                    }}
                />
            {/if}
        </span>
    </p>

    {#if userName == "Anonymous User"}
        <div id="login-section">
            <h2>Login</h2>

            <div>
                <label for="email-input">Email </label>
                <input
                    id="email-input"
                    name="email-input"
                    type="text"
                    bind:value={email}
                />
            </div>
            <div>
                <label for="pass-input">Password </label>
                <input
                    id="pass-input"
                    name="pass-input"
                    type="password"
                    required
                    bind:value={password}
                />
            </div>

            <input type="submit" value="login" onclick={authenticate} />
        </div>
    {/if}

    <div id="catalog-section">
        <h2>Catalog</h2>

        {#if userName != "Anonymous User"}
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
                    {#if userName != "Anonymous User"}
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

    <p>v1.2</p>
</main>
