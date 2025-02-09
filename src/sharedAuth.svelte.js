import { supabase } from "./supabaseClient";

export const user = $state({
    name: null,
    isAnon: null,
    isAuthenticated: false,
    isValentine: false
});

export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();

    if (data.user === null) {
        user.name = "Anonymous User";
        user.isAnon = true;
    } else {
        user.name = data.user.email;
        user.isAnon = false;
        user.isAuthenticated = true;
    }
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    getCurrentUser();
}
