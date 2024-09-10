-- Up Migration
CREATE TABLE IF NOT EXISTS  follows
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  followed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE("follower_id", "following_id")
);
-- Follows table indexes
CREATE INDEX idx_follows_followerId ON follows("follower_id");
CREATE INDEX idx_follows_followingId ON follows("following_id");
-- Down Migration

DROP INDEX IF EXISTS idx_follows_followingId;
DROP INDEX IF EXISTS idx_follows_followerId;
DROP TABLE IF EXISTS follows;
