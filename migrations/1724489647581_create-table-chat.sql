-- Up Migration
CREATE TABLE IF NOT EXISTS  chats
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);
-- Chats table indexes
CREATE INDEX idx_chats_senderId ON chats("sender_id");
CREATE INDEX idx_chats_receiverId ON chats("receiver_id");
CREATE INDEX idx_chats_groupId ON chats("group_id");

-- Down Migration

DROP INDEX IF EXISTS idx_chats_senderId;
DROP INDEX IF EXISTS idx_chats_receiverId;
DROP INDEX IF EXISTS idx_chats_groupId;

DROP TABLE IF EXISTS chats;
