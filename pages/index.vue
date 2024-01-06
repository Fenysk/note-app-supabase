<script setup lang="ts">
const config = useRuntimeConfig()

const supabaseClient = useSupabaseClient()

const { data: { session } } = await supabaseClient.auth.getSession()

const handleLoginWithFacebook = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
            redirectTo: `${config.public.URL}/dashboard`
        }
    })
    if (error) alert(error.message)
}
</script>

<template>
    <div>
        <h1>Write now, publish later !</h1>

        <button @click="handleLoginWithFacebook" v-if="!session">
            Login with Facebook
        </button>
    </div>
</template>
