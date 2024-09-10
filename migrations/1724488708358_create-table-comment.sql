-- Up Migration

CREATE TABLE IF NOT EXISTS comments
(
  id uuid default gen_random_uuid() primary key,
  post_id uuid not null references posts(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  content text,
  parent_comment_id uuid references comments(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
-- comments table indexes
create index idx_comments_postid on comments("post_id");
create index idx_comments_userid on comments("user_id");
create index idx_comments_parent_comment_id on comments("parent_comment_id");

CREATE TABLE IF NOT EXISTS  mentions
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  mention_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
-- Mentions table indexes
CREATE INDEX idx_mentions_commentId ON mentions("comment_id");
CREATE INDEX idx_mentions_mentionUserId ON mentions("mention_user_id");


-- Down Migration
DROP INDEX IF EXISTS idx_comments_userid;
DROP INDEX IF EXISTS idx_comments_postid;
DROP INDEX IF EXISTS idx_comments_parent_comment_id;
DROP INDEX IF EXISTS idx_mentions_commentId;
DROP INDEX IF EXISTS idx_mentions_mentionUserId;

DROP TABLE IF EXISTS mentions;
DROP TABLE IF EXISTS comments;
