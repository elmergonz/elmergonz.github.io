import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://bvagtoscrgzzbxtpfcuc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2YWd0b3Njcmd6emJ4dHBmY3VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNzY3NTQsImV4cCI6MjA1MTg1Mjc1NH0.yp9LG7lzv3OF-vDLbwnx20BMUcKqYdllLuXHAUDrObk";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.onload = (event) => {
    geCurrentUser();
    getProducts();
};

async function addProduct() {
    const productName = document.getElementById("product-input").value;
    const productList = document.getElementById("product-list");

    if (!productName) {
        alert('Debes insertar un producto amor :3');
        return;
    }

    const { data, status, error } = await supabase
        .from("product")
        .insert({ name: productName })
        .select();

    if (error) console.log(error);

    if (status === 201) {
        data.forEach(product => {
            let newProduct = document.createElement('li');
            newProduct.id = `product-${product.id}`;
            newProduct.innerHTML = `${product.name} <input type="button" value="delete" onclick="deleteProduct(${product.id})">`;
            productList.appendChild(newProduct);
        });
    }
}

async function deleteProduct(id) {
    const response = await supabase
        .from('product')
        .delete()
        .eq('id', id);

    if (response.status === 204) {
        const productList = document.getElementById("product-list");
        let product = document.getElementById(`product-${id}`);

        productList.removeChild(product)
    }
}

async function getProducts() {
    const productList = document.getElementById("product-list");

    const { data, error } = await supabase
        .from("product")
        .select();

    if (error) console.log(error);

    data.forEach(product => {
        let newProduct = document.createElement('li');
        newProduct.id = `product-${product.id}`;
        newProduct.innerHTML = `${product.name} <input type="button" value="delete" onclick="deleteProduct(${product.id})">`;
        productList.appendChild(newProduct);
    });
}

async function authenticate() {
    const emailInput = document.getElementById("email-input");
    const passInput = document.getElementById("pass-input");

    if (!emailInput.value || !passInput.value) {
        alert("Debes ingresar un usuario y contraseña");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput.value,
        password: passInput.value,
    });

    location.reload();
}

async function geCurrentUser() {
    const username = document.getElementById("user-logged");

    const { data, error } = await supabase.auth.getUser();

    if (data.user === null) {
        username.innerText = "Anonymous User";

        document.getElementById("add-product-section").style = "display: none";
    } else {
        username.innerText = data.user.email;
        username.parentElement.innerHTML += ` <input type="button" value="logout" onclick="signOut()">`;
        document.getElementById("login-section").style = "display: none";
    }
}

async function signOut() {
    const { error } = await supabase.auth.signOut();
    
    location.reload();
}
