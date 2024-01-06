<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
})

const supabaseClient = useSupabaseClient()

const { data: { session } } = await supabaseClient.auth.getSession()

const content = ref<string>('');
const tag = ref<string | null>(null);
const scheduledFor = ref<string>('');

const createNewPost = async () => {

    const { error } = await supabaseClient.from('scheduled-posts').insert({
        user_id: session?.user.id,
        content: content.value,
        tag: tag.value,
        scheduled_for: new Date(scheduledFor.value)
    })

    if (error) {
        console.error(error);
        return;
    }

    navigateTo('/dashboard');
}

</script>

<template>
    <h2>Create new post</h2>
    
    <form class="flex flex-col w-fit" @submit.prevent="createNewPost">
        <!-- Content -->
        <div class="flex flex-col mb-4">
            <label for="content">Content</label>
            <textarea required id="content" class="border" v-model="content" />
        </div>

        <!-- Tag -->
        <div class="flex flex-col mb-4">
            <label for="tag">Tag</label>
            <input id="tag" class="border" v-model="tag" />
        </div>

        <!-- Scheduled For -->
        <div class="flex flex-col mb-4">
            <label for="scheduled-for">Scheduled For</label>
            <input required id="scheduled-for" class="border" v-model="scheduledFor" type="datetime-local" />
        </div>

        <!-- Submit -->
        <button class="Button" type="submit">Create</button>
    </form>
</template>


<style scoped>
.Button {
    @apply border border-black/10 rounded-lg px-4 py-2 text-sm font-semibold bg-orange-200 hover:bg-yellow-400
}
</style>
