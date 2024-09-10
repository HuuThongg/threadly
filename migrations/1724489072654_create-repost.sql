-- Up Migration

CREATE TABLE IF NOT EXISTS  reposts 
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reposted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reposts table indexes
CREATE INDEX idx_reposts_originalPostId ON reposts("post_id");
CREATE INDEX idx_reposts_userId ON reposts("user_id");

-- Down Migration
DROP INDEX IF EXISTS idx_reposts_originalPostId;
DROP INDEX IF EXISTS idx_reposts_userId;

DROP TABLE IF EXISTS reposts;
