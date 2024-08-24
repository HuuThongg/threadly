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
    c.updated_at
FROM 
    comments c
JOIN 
    users u ON c."userId" = u.id;


    -- Down Migration
DROP VIEW IF EXISTS post_comments_view;
