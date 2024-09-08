-- Up Migration


CREATE OR REPLACE VIEW post_comments_view AS
SELECT 
    c.id AS comment_id,
    c."postId" AS post_id,
    c."userId" AS user_id,
    u.handle AS user_handle,
    c.content,
    c."parent_comment_id",
    c.created_at,
    coalesce(json_agg(
    json_build_object(
      'image_url', ci.image_url,
      'blurhash', ci."blurHash"
    )
  ) filter (where ci.image_url is not null), '[]') as images
FROM 
    comments c
JOIN 
    users u ON c."userId" = u.id
LEFT JOIN 
    comment_images ci ON c.id = ci."commentId"
GROUP BY 
    c.id, u.handle; 



    -- Down Migration
DROP VIEW IF EXISTS post_comments_view;
