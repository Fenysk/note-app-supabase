<script setup lang="ts">
import type PostType from '@/entities/post';

const supabaseClient = useSupabaseClient()
const postId = useRoute().params.id

const post = ref<PostType | undefined>(undefined)
const postInputs = reactive<{ [key: string]: any }>({
    content: '',
    scheduled_for: '',
    tag: '',
    parent_id: 0,
})

const hasTag = ref(false)
const hasParentId = ref(false)

const adjustScheduledTime = (scheduledTime: Date) => {
    const offset = new Date().getTimezoneOffset();
    const adjustedTime = new Date(scheduledTime);
    adjustedTime.setMinutes(adjustedTime.getMinutes() - offset);
    return adjustedTime.toISOString().split('.')[0];
}

const fetchPost = async () => {
    const { data } = await supabaseClient
        .from('scheduled-posts')
        .select('*')
        .eq('id', postId)
        .single()

    post.value = data as unknown as PostType
    postInputs.content = post.value?.content;
    postInputs.scheduled_for = adjustScheduledTime(post.value?.scheduled_for);

    postInputs.tag = post.value?.tag;
    postInputs.parent_id = post.value?.parent_id;

    hasTag.value = post.value?.tag !== null;
    hasParentId.value = post.value?.parent_id !== null;
}

onMounted(async () => {
    await fetchPost()
})

const updatePost = async (data: Partial<PostType>) => {

    const isScheduledForInTheFuture = new Date(data.scheduled_for as string).getTime() > new Date().getTime()

    if (!isScheduledForInTheFuture) {
        alert('Scheduled for must be in the future')
        return
    }

    data.scheduled_for = new Date(data.scheduled_for as string).toISOString()

    const { error } = await supabaseClient
        .from('scheduled-posts')
        .update(data as Partial<PostType>)
        .eq('id', postId)

    if (error) {
        alert(error.message)
        return
    }

    navigateTo('/dashboard')
}

const deletePost = async () => {

    if (!confirm('Are you sure you want to delete this post?')) return

    const { error } = await supabaseClient
        .from('scheduled-posts')
        .delete()
        .eq('id', postId)

    if (error) {
        alert(error.message)
        return
    }

    navigateTo('/dashboard')
}

</script>

<template>
    <div>
        <h1>Post</h1>
        <pre>{{ post }}</pre>
    </div>

    <form @submit.prevent="updatePost(postInputs)">
        <div>
            <label for="content">Content</label>
            <input required v-model="postInputs.content" />
        </div>

        <div>
            <label for="scheduled_for">Scheduled for</label>
            <input required v-model="postInputs.scheduled_for" type="datetime-local" />
        </div>

        <div>
            <div>
                <label for="hasTag">Has tag</label>
                <input type="checkbox" v-model="hasTag" />
            </div>
            <div v-if="hasTag">
                <label for="tag">Tag</label>
                <input required v-model="postInputs.tag" />
            </div>
        </div>

        <div>
            <div>
                <label for="hasParentId">Has parent ID</label>
                <input type="checkbox" v-model="hasParentId" />
            </div>
            <div v-if="hasParentId">
                <label for="parent_id">Parent ID</label>
                <input required v-model="postInputs.parent_id" type="number" />
            </div>
        </div>

        <NuxtLink to="/dashboard">Cancel</NuxtLink>
        <button type="submit">Update</button>
        <button type="button" @click="deletePost">Delete</button>
    </form>
</template>
