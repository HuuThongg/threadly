CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,

  PRIMARY KEY(identifier, token)
);

CREATE TABLE users
(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  handle VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  bio TEXT,
  gender TEXT,
  onboarding_complete BOOLEAN DEFAULT FALSE
);
-- Users table indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_handle ON users(handle);

CREATE TABLE accounts
(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES users(id),
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT
);

CREATE TABLE sessions
(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES users(id),
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL UNIQUE
);


CREATE IF NOT EXISTS TABLE likes
(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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

CREATE IF NOT EXISTS TABLE reposts
(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "originalPostId" UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  "userId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reposted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reposts table indexes
CREATE INDEX idx_reposts_originalPostId ON reposts("originalPostId");
CREATE INDEX idx_reposts_userId ON reposts("userId");


CREATE IF NOT EXISTS TABLE mentions
(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "commentId" UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  "mentionUserId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
-- Mentions table indexes
CREATE INDEX idx_mentions_commentId ON mentions("commentId");
CREATE INDEX idx_mentions_mentionUserId ON mentions("mentionUserId");


create if not exists table comments
(
  id uuid default uuid_generate_v4() primary key,
  "postId" uuid not null references posts(id) on delete cascade,
  "userId" uuid not null references posts(id) on delete cascade,
  content text,
  "parent_comment_id" uuid references comments(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
-- comments table indexes
create index idx_comments_postid on comments("postId");
create index idx_comments_userid on comments("userId");
create index idx_comments_parent_comment_id on comments("parent_comment_id");




CREATE IF NOT EXISTS TABLE posts
(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "postId" UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Posts table indexes
CREATE INDEX idx_posts_userId ON posts("userId");

CREATE IF NOT EXISTS TABLE post_images
(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "postId" UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL
);
-- Post Images table indexes
CREATE INDEX idx_post_images_postId ON post_images("postId");

CREATE IF NOT EXISTS TABLE follows
(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "followerId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "followingId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  followed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE("followerId", "followingId")
);
-- Follows table indexes
CREATE INDEX idx_follows_followerId ON follows("followerId");
CREATE INDEX idx_follows_followingId ON follows("followingId");

CREATE IF NOT EXISTS TABLE group_members
(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "groupId" UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  "userId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE("groupId", "userId")
);
-- Group Members table indexes
CREATE INDEX idx_group_members_groupId ON group_members("groupId");
CREATE INDEX idx_group_members_userId ON group_members("userId");

CREATE IF NOT EXISTS TABLE chats
(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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



CREATE IF NOT EXISTS TABLE groups
(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Groups table indexes
CREATE INDEX idx_groups_name ON groups(name);
