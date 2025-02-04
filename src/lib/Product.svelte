<script>
    let { product, user } = $props();
</script>

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
