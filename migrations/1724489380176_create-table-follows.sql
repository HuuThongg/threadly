-- Up Migration
CREATE TABLE IF NOT EXISTS  follows
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "followerId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "followingId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  followed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE("followerId", "followingId")
);
-- Follows table indexes
CREATE INDEX idx_follows_followerId ON follows("followerId");
CREATE INDEX idx_follows_followingId ON follows("followingId");
-- Down Migration

DROP INDEX IF EXISTS idx_follows_followingId;
DROP INDEX IF EXISTS idx_follows_followerId;

DROP TABLE IF EXISTS follows;
