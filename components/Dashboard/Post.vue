<script setup lang="ts">
import type PostType from '@/entities/post';

const props = defineProps({
    post: {
        type: Object as PropType<PostType>,
        required: true,
    },
})

const formattedDate = (date: string) => {
    const dateObject = new Date(date)
    return dateObject.toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })
}
</script>

<template>
    <div>
        <table>
            <tr>
                <td>ID</td>
                <td>{{ post.id }}</td>
            </tr>
            <tr>
                <td>User ID</td>
                <td>{{ post.user_id }}</td>
            </tr>
            <tr>
                <td>Created At</td>
                <td>{{ formattedDate(post.created_at) }}</td>
            </tr>
            <tr>
                <td>Content</td>
                <td>{{ post.content }}</td>
            </tr>
            <tr>
                <td>Tags</td>
                <td>{{ post.tag || 'NULL' }}</td>
            </tr>
            <tr>
                <td>Scheduled For</td>
                <td>{{ formattedDate(post.scheduled_for) }}</td>
            </tr>
            <tr>
                <td>Parent ID</td>
                <td>{{ post.parent_id || 'NULL' }}</td>
            </tr>
            <tr>
                <td>Is ready</td>
                <td>{{ post['posts-ready'] ? 'true' : 'false' }}</td>
            </tr>
        </table>

        <NuxtLink :to="`/dashboard/posts/${post.id}`">Edit</NuxtLink>
    </div>
</template>
