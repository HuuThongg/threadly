-- Up Migration
CREATE TABLE IF NOT EXISTS  chats
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "senderId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "receiverId" UUID REFERENCES users(id) ON DELETE CASCADE,
  "groupId" UUID REFERENCES groups(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);
-- Chats table indexes
CREATE INDEX idx_chats_senderId ON chats("senderId");
CREATE INDEX idx_chats_receiverId ON chats("receiverId");
CREATE INDEX idx_chats_groupId ON chats("groupId");

-- Down Migration

DROP TABLE IF EXISTS chats;
DROP INDEX IF EXISTS idx_chats_senderId;
DROP INDEX IF EXISTS idx_chats_receiverId;
DROP INDEX IF EXISTS idx_chats_groupId;
