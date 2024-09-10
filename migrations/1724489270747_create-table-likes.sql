-- Up Migration

CREATE TABLE IF NOT EXISTS  likes
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
   user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  liked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE("post_id","user_id"),
  UNIQUE("comment_id","user_id")
);
-- Likes table indexes
  CREATE INDEX idx_likes_postId ON likes("post_id");
CREATE INDEX idx_likes_commentId ON likes("comment_id");
CREATE INDEX idx_likes_userId ON likes("user_id");
-- Down Migration

DROP INDEX IF EXISTS idx_likes_postId;
DROP INDEX IF EXISTS idx_likes_commentId;
DROP INDEX IF EXISTS idx_likes_userId;

DROP TABLE IF EXISTS likes;
