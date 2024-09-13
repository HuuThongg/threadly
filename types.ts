import { boolean, string } from "zod"

export interface User {
  id: string // Assuming UUID
  handle: string
  name: string
  email: string
  emailVerified: boolean | null
  image: string | null
  bio: string | null
  gender: string | null
  onboarding_complete: boolean
}
export interface UserWithFollowStatus extends User {
  following: boolean
  followed: boolean
}
export interface Post {
  id: string // Assuming UUID
  user_id: string // Foreign key to User
  content: string
  created_at: Date
}

export type Comment = {
  id: string // Assuming UUID
  post_id: string // Foreign key to Post
  user_id: string // Foreign key to User
  content: string
  created_at: Date
  parent_comment_id: string
}

export type Like = {
  id: string // Assuming UUID
  post_id: string // Foreign key to Post
  user_id: string // Foreign key to User
  like_at: Date
  comment_id: string | null
}

export type PartialUser = Pick<
  User,
  "id" | "handle" | "name" | "image" | "onboarding_complete"
>

export type Repost = {
  id: string // Assuming UUID
  user_id: string // Foreign key to User
  post_id: string // Foreign key to Post
  reposted_at: Date
}

export type Follow = {
  follower_id: string // Foreign key to User
  following_id: string // Foreign key to User
}
export type PostImage = {
  image_url: string
  blur_hash: string
}
export type UserPostView = {
  post_id: string // Post ID
  user_id: string // User ID
  user_handle: string // User handle from the users table
  user_name: string
  user_image: string
  content: string // Post content
  created_at: Date // Post creation date
  like_count: number // Calculated count of likes
  repost_count: number // Calculated count of reposts
  comment_count: number
  images: PostImage[]
}
export interface PostCommentsView {
  comment_id: string
  post_id: string
  user_id: string
  user_handle: string
  content: string
  parent_comment_id: string | null
  created_at: Date
  images: PostImage[]
  like_count: number
  repost_count: number
  comment_count: number
  user_image: string
}

export interface InteractionCount {
  like_count: number // Calculated count of likes
  repost_count: number // Calculated count of reposts
  comment_count: number
}
export type MessageInfo = {
  group_id: string
  sender_id: string
  receiver_id: string
  message: string
  sent_at: Date
}

export interface chatGroupView {
  chat_group_id: string
  lastMessage: string
  lastMessageTimestamp: Date
  chatPartner: PartialUser
  isSentByCurrentUser: boolean
}

export type MessageChat = {
  id: string
  sender_id: string
  receiver_id: string
  group_id: string
  message: string
  sent_at: Date
}

export interface CreateCommentParams {
  user_id: string // ID of the user creating the comment
  post_id: string // ID of the post the comment is related to
  content?: string // Content of the comment
  parent_comment_id?: string | null // Optional ID of the parent comment for nested comments
  images?: string[]
  blur_hashes?: string[]
}
export interface CommentNode extends PostCommentsView {
  replies: CommentNode[]
}
