-- Up Migration
CREATE TABLE IF NOT EXISTS  chat_groups
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Groups table indexes
CREATE INDEX idx_groups_name ON groups(name);

CREATE TABLE IF NOT EXISTS  group_members
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE("group_id", "user_id")
);
-- Group Members table indexes
CREATE INDEX idx_group_members_groupId ON group_members("group_id");
CREATE INDEX idx_group_members_userId ON group_members("user_id");

-- Down Migration

DROP INDEX IF EXISTS idx_groups_name;
DROP INDEX IF EXISTS idx_group_members_userId;
DROP INDEX IF EXISTS idx_group_members_groupId;

DROP TABLE IF EXISTS group_members;
DROP TABLE IF EXISTS groups;
