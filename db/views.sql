CREATE OR REPLACE VIEW user_posts_view AS
SELECT 
  p.id AS post_id
  p.userId AS user_id,
  u.handle as user_handle,
  p.content,
  p.created_at,
  (SELECT count(*) FROM likes l where l.postId = p.id) AS like_count,
  (SELECT count(*) FROM reposts r WHERE r.originalPostId = p.id) AS repost_count
FROM 
  posts p 
JOIN
  users u on p.userId =u.id;

CREATE OR REPLACE VIEW post_comments_view AS
SELECT 
    c.id AS comment_id,
    c."postId" AS post_id,
    c."userId" AS user_id,
    u.handle AS user_handle,
    c.content,
    c."parent_comment_id",
    c.created_at,
    c.updated_at
FROM 
    comments c
JOIN 
    users u ON c."userId" = u.id;


CREATE OR REPLACE VIEW user_followers_view AS
SELECT 
    f."followingId" AS user_id,
    u.handle AS user_handle,
    f."followerId" AS follower_id,
    uf.handle AS follower_handle,
    f.followed_at
FROM 
    follows f
JOIN 
    users u ON f."followingId" = u.id
JOIN 
    users uf ON f."followerId" = uf.id;
