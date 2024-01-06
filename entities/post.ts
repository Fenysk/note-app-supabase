export default interface PostType {
    id: string,
    user_id: string,
    created_at: string,
    content: string,
    tag: string,
    parent_id: number,
    scheduled_for: string
}
