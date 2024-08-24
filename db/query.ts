import { pool } from "."

export async function getFolloweredUserPosts(userId: string) {
  const query = `
    SELECT upv.*
    FROM user_posts_view upv
    JOIN follows f ON upv.user_id = f.followingId
    WHERE f.followerId = $1
    ORDER BY upv.created_at DESC;
  `
  const values = [userId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows
  } catch (error) {
    console.error("Error executing query", error)
    throw new Error("Failed to fetch posts from the database")
  } finally {
    client.release()
  }
}

export async function getPostById(postId: string) {
  const query = `
    SELECT * 
    FROM user_posts_view
    WHERE post_id = $1;
  `
  const values = [postId]
  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows[0]
  } catch (error) {
    console.error("Error executing query", error)
    throw new Error("Failed to fetch posts from the database")
  } finally {
    client.release()
  }
}

export async function getCommentsByPostId(postId: string) {
  const query = `
    SELECT *
    FROM comments
    WHERE postId = $1
    ORDER BY created_at ASC;
  `
  const values = [postId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows
  } catch (error) {
    console.error("Error executing query", error)
    throw new Error("Failed to fetch posts from the database")
  } finally {
    client.release()
  }
}

export async function getLikesByPostId(postId: string) {
  const query = `
    SELECT u.id, u.handle, u.name, u.image
    FROM likes l
    JOIN users u ON l."userId" = u.id
    WHERE l."postId" = $1;
  `
  const values = [postId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows
  } finally {
    client.release()
  }
}

export async function getUserProfileById(userId: string) {
  const query = `
    SELECT id, handle, name, email, "emailVerified", image
    FROM users
    WHERE id = $1;
  `
  const values = [userId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows[0]
  } finally {
    client.release()
  }
}

export async function searchUsersByHandle(handle: string) {
  const query = `
    SELECT id, handle, name, image
    FROM users
    WHERE handle ILIKE $1;
  `
  const values = [`%${handle}%`]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows
  } finally {
    client.release()
  }
}

export async function getRepostsByPostId(postId: string) {
  const query = `
    SELECT u.id, u.handle, u.name, u.image, r.reposted_at
    FROM reposts r
    JOIN users u ON r."userId" = u.id
    WHERE r."originalPostId" = $1;
  `
  const values = [postId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows
  } finally {
    client.release()
  }
}

export async function getFollowerCount(userId: string) {
  const query = `
    SELECT COUNT(*) AS follower_count
    FROM follows
    WHERE "followingId" = $1;
  `
  const values = [userId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows[0].follower_count
  } finally {
    client.release()
  }
}

export async function getFollowingCount(userId: string) {
  const query = `
    SELECT COUNT(*) AS following_count
    FROM follows
    WHERE "followerId" = $1;
  `
  const values = [userId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows[0].following_count
  } finally {
    client.release()
  }
}

interface CreatePostParams {
  userId: string // ID of the user creating the post
  content: string // Content of the post
  images?: string[] // Optional array of image URLs
}

export async function createPost({ userId, content, images }: CreatePostParams) {
  const client = await pool.connect()
  try {
    // Start a transaction
    await client.query("BEGIN")

    // Insert the post data
    const postInsertQuery = `
      INSERT INTO posts ("userId", content, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      RETURNING id;
    `
    const postValues = [userId, content]
    const postResult = await client.query(postInsertQuery, postValues)
    const postId = postResult.rows[0].id

    // Insert the post images if they exist
    if (images && images.length > 0) {
      const imageInsertQuery = `
        INSERT INTO post_images (postId, image_url)
        VALUES ${images.map((_, index) => `($1, $${index + 2})`).join(", ")}
      `
      const imageValues = [postId, ...images]
      await client.query(imageInsertQuery, imageValues)
    }

    // Commit the transaction
    await client.query("COMMIT")

    return postId
  } catch (error) {
    // Rollback the transaction on error
    await client.query("ROLLBACK")
    console.error("Error creating post", error)
    throw new Error("Failed to create post")
  } finally {
    client.release()
  }
}

interface CreateCommentParams {
  userId: string // ID of the user creating the comment
  postId: string // ID of the post the comment is related to
  content: string // Content of the comment
  parentCommentId?: string // Optional ID of the parent comment for nested comments
}

export async function createComment({
  userId,
  postId,
  content,
  parentCommentId,
}: CreateCommentParams) {
  const client = await pool.connect()
  try {
    // Start a transaction
    await client.query("BEGIN")

    // Insert the comment data
    const commentInsertQuery = `
      INSERT INTO comments ("postId", "userId", content, "parent_comment_id", created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id;
    `
    const commentValues = [postId, userId, content, parentCommentId || null]
    const commentResult = await client.query(commentInsertQuery, commentValues)
    const commentId = commentResult.rows[0].id

    // Commit the transaction
    await client.query("COMMIT")

    return commentId
  } catch (error) {
    // Rollback the transaction on error
    await client.query("ROLLBACK")
    console.error("Error creating comment", error)
    throw new Error("Failed to create comment")
  } finally {
    client.release()
  }
}
