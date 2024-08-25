-- Up Migration

CREATE TABLE IF NOT EXISTS  reposts 
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "originalPostId" UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  "userId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reposted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reposts table indexes
CREATE INDEX idx_reposts_originalPostId ON reposts("originalPostId");
CREATE INDEX idx_reposts_userId ON reposts("userId");

-- Down Migration
DROP INDEX IF EXISTS idx_reposts_originalPostId;
DROP INDEX IF EXISTS idx_reposts_userId;

DROP TABLE IF EXISTS reposts;
