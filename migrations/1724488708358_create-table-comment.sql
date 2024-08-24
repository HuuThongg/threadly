-- Up Migration

CREATE TABLE IF NOT EXISTS comments
(
  id uuid default gen_random_uuid() primary key,
  "postId" uuid not null references posts(id) on delete cascade,
  "userId" uuid not null references posts(id) on delete cascade,
  content text,
  parent_comment_id uuid references comments(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
-- comments table indexes
create index idx_comments_postid on comments("postId");
create index idx_comments_userid on comments("userId");
create index idx_comments_parent_comment_id on comments("parent_comment_id");

CREATE TABLE IF NOT EXISTS  mentions
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "commentId" UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  "mentionUserId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
-- Mentions table indexes
CREATE INDEX idx_mentions_commentId ON mentions("commentId");
CREATE INDEX idx_mentions_mentionUserId ON mentions("mentionUserId");


-- Down Migration
DROP TABLE IF EXISTS comments;
DROP INDEX IF EXISTS idx_comments_userid;
DROP INDEX IF EXISTS idx_comments_postid;
DROP INDEX IF EXISTS idx_comments_parent_comment_id;
DROP INDEX IF EXISTS idx_mentions_commentId;
DROP INDEX IF EXISTS idx_mentions_mentionUserId;
