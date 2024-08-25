-- Up Migration

CREATE TABLE IF NOT EXISTS  likes
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "postId" UUID REFERENCES posts(id) ON DELETE CASCADE,
  "commentId" UUID REFERENCES comments(id) ON DELETE CASCADE,
   "userId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "liked_at" TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE("postId","userId"),
  UNIQUE("commentId","userId")
);
-- Likes table indexes
  CREATE INDEX idx_likes_postId ON likes("postId");
CREATE INDEX idx_likes_commentId ON likes("commentId");
CREATE INDEX idx_likes_userId ON likes("userId");
-- Down Migration

DROP INDEX IF EXISTS idx_likes_postId;
DROP INDEX IF EXISTS idx_likes_commentId;
DROP INDEX IF EXISTS idx_likes_userId;

DROP TABLE IF EXISTS likes;
