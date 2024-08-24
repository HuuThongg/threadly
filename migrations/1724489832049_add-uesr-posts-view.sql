-- Up Migration
CREATE OR REPLACE VIEW user_posts_view AS
SELECT 
  p.id AS post_id,
  p."userId" AS user_id,
  u.handle as user_handle,
  p.content,
  p.created_at,
  (SELECT count(*) FROM likes l where l."postId" = p.id) AS like_count,
  (SELECT count(*) FROM reposts r WHERE r."originalPostId" = p.id) AS repost_count
FROM 
  posts p 
JOIN
  users u on p."userId" = u.id;
-- Down Migration

DROP VIEW IF EXISTS user_posts_view;
