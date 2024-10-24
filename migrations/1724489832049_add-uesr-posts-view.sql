-- Up Migration

CREATE OR REPLACE VIEW user_posts_view AS
SELECT 
  p.id AS post_id,
  p.user_id AS user_id,
  u.handle AS user_handle,
  u.name AS user_name,
  u.image AS user_image,
  p.content,
  p.created_at,
  (SELECT count(*)::int FROM likes l WHERE l.post_id = p.id) AS like_count,
  (SELECT count(*)::int FROM reposts r WHERE r.post_id = p.id) AS repost_count,
  (SELECT count(*)::int FROM comments c WHERE c.post_id = p.id) as comment_count,
  -- Aggregate images as a JSON array
  coalesce(json_agg(
    json_build_object(
      'image_url', pi.image_url,
      'blur_hash', pi.blur_hash
    )
  ) filter (where pi.image_url is not null), '[]') as images
FROM 
  posts p 
JOIN
  users u ON p.user_id = u.id
LEFT JOIN
  post_images pi ON p.id = pi.post_id
GROUP BY
  p.id, u.handle, u.name, u.image, p.content, p.created_at;
-- Down Migration

DROP VIEW IF EXISTS user_posts_view;
