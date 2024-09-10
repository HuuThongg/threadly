-- Up Migration

CREATE OR REPLACE VIEW user_followers_view AS
SELECT 
    f.following_id AS user_id,
    u.handle AS user_handle,
    f.follower_id AS follower_id,
    uf.handle AS follower_handle,
    f.followed_at
FROM 
    follows f
JOIN 
    users u ON f.following_id = u.id
JOIN 
    users uf ON f.follower_id = uf.id;
-- Down Migration

DROP VIEW IF EXISTS user_followers_view;
