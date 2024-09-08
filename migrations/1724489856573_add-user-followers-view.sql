-- Up Migration

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
-- Down Migration

DROP VIEW IF EXISTS user_followers_view;
