import {
  CreateCommentParams,
  PartialUser,
  PostCommentsView,
  User,
  UserPostView,
  UserWithFollowStatus,
} from "@/types"
import { pool } from "."
import { v4 as uuidv4 } from "uuid"

export async function getFolloweredUserPosts(userId: string): Promise<UserPostView[]> {
  const query = `
    SELECT upv.*
    FROM user_posts_view upv
    JOIN follows f ON upv.user_id = f.following_id
    WHERE f.followerId = $1
    ORDER BY upv.created_at DESC;
  `
  const values = [userId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows as UserPostView[]
  } catch (error) {
    console.error("Error executing query", error)
    throw new Error("Failed to fetch posts from the database")
  } finally {
    client.release()
  }
}

export async function getPostByUserId(user_id: string) {
  const query = `
    SELECT  *  FROM user_posts_view
    WHERE user_id = $1;
  `

  const values = [user_id]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows
  } catch (error) {
    console.error("Error executing query", error)
    throw new Error("Failed to fetch posts for userID from the database")
  } finally {
    client.release()
  }
}

export async function getPosts(): Promise<UserPostView[]> {
  const query = `
    SELECT  *  FROM user_posts_view;
  `
  const client = await pool.connect()
  try {
    const res = await client.query(query)
    return res.rows as UserPostView[]
  } catch (error) {
    throw new Error("failed to fetch user_posts_view")
  }
}

export async function updateEmailVerified(userId: string) {
  const query = `
    UPDATE users
    SET "emailVerified" = NOW()
    WHERE userId = $1;
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

export async function getPostById(postId: string): Promise<UserPostView> {
  const query = `
    SELECT * 
    FROM user_posts_view
    WHERE post_id = $1;
  `

  const values = [postId]
  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows[0] as UserPostView
  } catch (error) {
    console.error("Error executing query", error)
    throw new Error("Failed to fetch posts from the database")
  } finally {
    client.release()
  }
}

export async function getCommentsByPostId(postId: string): Promise<PostCommentsView[]> {
  //const query = `
  //  SELECT *
  //  FROM comments
  //  WHERE postId = $1
  //  ORDER BY created_at ASC;
  //`
  const query = `
    SELECT * 
    FROM post_comments_view
    WHERE post_id = $1
    ORDER BY created_at ASC;
  `
  const values = [postId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows as PostCommentsView[]
  } catch (error) {
    console.error("Error executing query", error)
    throw new Error("Failed to fetch posts from the database")
  } finally {
    client.release()
  }
}

export async function getLikesByPostId(postId: string): Promise<PartialUser[]> {
  const query = `
    SELECT u.id, u.handle, u.name, u.image
    FROM likes l
    JOIN users u ON l.user_id= u.id
    WHERE l."post_id" = $1;
  `
  const values = [postId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows as PartialUser[]
  } finally {
    client.release()
  }
}

export async function getUserProfileById(userId: string): Promise<PartialUser> {
  const query = `
    SELECT id, handle, name, email, image, onboarding_complete
    FROM users
    WHERE id = $1;
  `
  const values = [userId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows[0] as PartialUser
  } finally {
    client.release()
  }
}
export async function getUserByHandle(handle: string): Promise<User> {
  const query = `
    SELECT *
    FROM users
    WHERE handle = $1;
  `
  const values = [handle]

  try {
    const res = await pool.query(query, values)
    return res.rows[0] as User
  } catch (error) {
    console.error("Error executing query", error)
    throw new Error("Failed to search users")
  }
}

export async function searchUsers(
  currentUserId: string,
  searchTerm: string,
): Promise<PartialUser[]> {
  //const query = `
  //  SELECT u.id,
  //         u.handle,
  //         u.name,
  //         u.email,
  //         u.image,
  //         u.bio,
  //         u.gender,
  //         COALESCE(f_following."followerId" IS NOT NULL, FALSE) AS following, -- Current user following this user
  //         COALESCE(f_followed."followerId" IS NOT NULL, FALSE) AS followed,   -- This user following the current user
  //         ts_rank(u.search_vector, query) AS rank
  //  FROM users u
  //  LEFT JOIN follows f_following
  //    ON u.id = f_following."followingId" AND f_following."followerId" = $1
  //  LEFT JOIN follows f_followed
  //    ON u.id = f_followed."followerId" AND f_followed."followingId" = $1
  //  CROSS JOIN to_tsquery('english', $2) query
  //  WHERE u.search_vector @@ query
  //    AND u.id <> $1
  //  ORDER BY rank DESC;
  //`

  const query1 = `
  SELECT u.id, 
         u.handle, 
         u.name, 
         u.image
          FROM users u
 
  WHERE u.id <> $1 AND (u.handle ILIKE '%' || $2 || '%' OR u.name ILIKE '%' || $2 || '%');
`

  // Transform searchTerm to tsquery format
  const formattedSearchTerm = searchTerm.split(" ").join(" & ")

  //const values = [currentUserId, formattedSearchTerm];
  const values = [currentUserId, searchTerm]

  const client = await pool.connect()
  try {
    const res = await client.query(query1, values)
    return res.rows as PartialUser[]
  } catch (error) {
    console.error("Error executing query", error)
    throw new Error("Failed to search users")
  } finally {
    client.release()
  }
}

export async function getRepostsByPostId(postId: string) {
  const query = `
    SELECT u.id, u.handle, u.name, u.image, r.reposted_at
    FROM reposts r
    JOIN users u ON r.user_id = u.id
    WHERE r.post_id = $1;
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
    WHERE following_id = $1;
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
    WHERE follower_id = $1;
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
  content?: string // Content of the post
  images?: string[] // Optional array of image URLs
  blurHashes?: string[]
}

export async function createPost({
  userId,
  content,
  images,
  blurHashes,
}: CreatePostParams): Promise<void> {
  const client = await pool.connect()
  if (!content && !images && !blurHashes) {
    throw new Error("Failed to create post")
  }

  try {
    // Start a transaction
    await client.query("BEGIN")

    // Insert the post data
    const postInsertQuery = `
      INSERT INTO posts (user_id, content, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      RETURNING id;
    `
    const postValues = [userId, content]
    const postResult = await client.query(postInsertQuery, postValues)
    const postId = postResult.rows[0].id

    // Insert the post images if they exist

    // Insert the post images and blurhashes if they exist
    if (images && images.length > 0 && blurHashes && blurHashes.length > 0) {
      const imageInsertQuery = `
    INSERT INTO post_images (post_id, image_url,blur_hash)
    VALUES ${images.map((_, index) => `($1, $${index * 2 + 2}, $${index * 2 + 3})`).join(", ")}`
      const imageValues = [postId]

      images.forEach((imageUrl, index) => {
        imageValues.push(imageUrl, blurHashes[index])
      })

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

export async function createComment({
  user_id,
  post_id,
  content,
  parent_comment_id,
  images,
  blur_hashes,
}: CreateCommentParams): Promise<string> {
  const client = await pool.connect()

  try {
    // Start a transaction
    await client.query("BEGIN")

    // Insert the comment data
    const commentInsertQuery = `
      INSERT INTO comments (post_id,user_id, content, "parent_comment_id", created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id;
    `
    const commentValues = [post_id, user_id, content, parent_comment_id || null]
    const commentResult = await client.query(commentInsertQuery, commentValues)
    const commentId = commentResult.rows[0].id
    if (images && images.length > 0 && blur_hashes && blur_hashes.length > 0) {
      const imageInsertQuery = `
    INSERT INTO comment_images (comment_id, image_url,blur_hash)
    VALUES ${images.map((_, index) => `($1, $${index * 2 + 2}, $${index * 2 + 3})`).join(", ")}
  `
      const imageValues = [commentId]

      images.forEach((imageUrl, index) => {
        imageValues.push(imageUrl, blur_hashes[index])
      })

      await client.query(imageInsertQuery, imageValues)
    }
    // Commit the transaction
    await client.query("COMMIT")

    return commentId as string
  } catch (error) {
    // Rollback the transaction on error
    await client.query("ROLLBACK")
    console.error("Error creating comment", error)
    throw new Error("Failed to create comment")
  } finally {
    client.release()
  }
}

interface OnboardingData {
  userId: string
  handle: string
  bio?: string
  profileImage?: File
}

export async function completeOnboarding(data: OnboardingData): Promise<void> {
  const { userId, handle, bio, profileImage } = data

  let profileImageUrl: string | null = null

  if (profileImage) {
    // Handle file upload (e.g., save to S3, filesystem)
    const imageFilename = `${uuidv4()}_${profileImage.name}`
    // Save the file and get the URL (implementation depends on your setup)
    // Example: Upload file to S3 and get URL
    profileImageUrl = `/path/to/images/${imageFilename}`
  }

  const client = await pool.connect()
  try {
    await client.query(
      `UPDATE users
       SET handle = $1, bio = $2, image = $3, onboarding_complete = TRUE
       WHERE id = $4`,
      [handle, bio || null, profileImageUrl || null, userId],
    )
  } finally {
    client.release()
  }
}
export async function getFollowers(currentUserId: string): Promise<PartialUser[]> {
  const query = `
    SELECT u.id, 
           u.handle, 
           u.name, 
           u.image
    FROM users u
    JOIN follows f_followed
      ON u.id = f_followed.follower_id
    WHERE f_followed.following_id= $1
      AND u.id <> $1;
  `
  const values = [currentUserId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows as PartialUser[]
  } catch (error) {
    console.error("Error executing query", error)
    throw new Error("Failed to fetch user from the database")
  } finally {
    client.release()
  }
}
export async function getFollowing(currentUserId: string): Promise<PartialUser[]> {
  const query = `
SELECT u.id , 
       u.handle, 
       u.name, 
       u.image, 
      FROM users u
  ON u.id = f_followed.follower_id=$1 AND f_followed.following_id
WHERE u.id <> $1; 
  `
  const values = [currentUserId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows as PartialUser[]
  } catch (error) {
    console.error("Error executing query", error)
    throw new Error("Failed to fetch user from the database")
  } finally {
    client.release()
  }
}
export async function getUsersWithFollowStatus(
  currentUserId: string,
  searchTerm: string,
): Promise<UserWithFollowStatus[]> {
  const query = `
  SELECT u.id, 
         u.handle, 
         u.name, 
         u.email, 
         u.image, 
         u.bio, 
         u.gender, 
         COALESCE(f_following.follower_id IS NOT NULL, FALSE) AS following, -- Current user following this user
         COALESCE(f_followed.follower_id IS NOT NULL, FALSE) AS followed    -- This user following the current user
  FROM users u
  LEFT JOIN follows f_following
    ON u.id = f_following.following_id AND f_following.follower_id = $1
  LEFT JOIN follows f_followed
    ON u.id = f_followed.follower_id AND f_followed.following_id = $1
  WHERE u.id <> $1 AND (u.handle ILIKE '%' || $2 || '%' OR u.name ILIKE '%' || $2 || '%');
`
  const values = [currentUserId, searchTerm]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    return res.rows as UserWithFollowStatus[]
  } catch (error) {
    console.error("Error executing query", error)
    throw new Error("Failed to search users")
  } finally {
    client.release()
  }
}

export async function getReceiverByChatGroupId(
  userId: string,
  chatGroupId: string,
): Promise<User> {
  const query = `
    SELECT EXISTS (
     SELECT 1
    FROM chat_groups
    WHERE id = $1)
  `
  const values = [chatGroupId]

  const client = await pool.connect()
  try {
    const res = await client.query(query, values)
    if (!res.rows[0].exists) {
      throw new Error("No receiver found for the given chat group ID")
    }

    const groupMemberQuery = `
SELECT 
  user_id
FROM group_members
WHERE 
  group_id = $1
  AND user_id != $2 
LIMIT 1;
`
    const groupMemberQueryValues = [chatGroupId, userId]
    const groupMemberResult = await client.query(groupMemberQuery, groupMemberQueryValues)

    if (groupMemberResult.rows.length === 0) {
      throw new Error("THe person is not in the group chat")
    }
    const receiverId = groupMemberResult.rows[0].user_id

    // Fetch the receiver's user details
    const userQuery = "SELECT * FROM users WHERE id = $1"
    const userRes = await client.query(userQuery, [receiverId])

    if (userRes.rows.length === 0) {
      throw new Error("Receiver not found in users table")
    }

    return userRes.rows[0] as User
  } catch (error) {
    console.error("Error executing query", error)
    throw new Error("Failed to fetch users from the database")
  } finally {
    client.release()
  }
}
