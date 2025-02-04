<script>
    import { supabase } from "../supabaseClient";
    import { user } from "../sharedAuth.svelte";

    let email = $state("");
    let password = $state("");

    async function authenticate() {
        if (!email || !password) {
            alert("Debes ingresar un usuario y contraseña");
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        user.name = data.user.email;
        user.isAnon = false;
        user.isAuthenticated = true;
    }

    function continueAnon() {
        user.isAuthenticated = true;
    }
</script>

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

    <input type="submit" value="Login" onclick={authenticate} />
    <input type="submit" value="Continue as Anonimous" onclick={continueAnon} />
</div>
