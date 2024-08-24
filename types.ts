export type User = {
  id: string // Assuming UUID
  handle: string
  name: string
  email: string
  emailVerified: boolean | null
  image: string | null
}

export type Post = {
  id: string // Assuming UUID
  userId: string // Foreign key to User
  content: string
  created_at: Date
}

export type Comment = {
  id: string // Assuming UUID
  postId: string // Foreign key to Post
  userId: string // Foreign key to User
  content: string
  created_at: Date
}

export type Like = {
  id: string // Assuming UUID
  userId: string // Foreign key to User
  postId: string // Foreign key to Post
}

export type Repost = {
  id: string // Assuming UUID
  userId: string // Foreign key to User
  originalPostId: string // Foreign key to Post
  reposted_at: Date
}

export type Follow = {
  followerId: string // Foreign key to User
  followingId: string // Foreign key to User
}

export type UserPostsView = {
  post_id: string // Post ID
  user_id: string // User ID
  user_handle: string // User handle from the users table
  content: string // Post content
  created_at: Date // Post creation date
  like_count: number // Calculated count of likes
  repost_count: number // Calculated count of reposts
}
