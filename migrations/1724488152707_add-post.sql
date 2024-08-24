-- Up Migration
-- Create the posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS posts
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Posts table indexes
CREATE INDEX idx_posts_userId ON posts("userId");

CREATE TABLE IF NOT EXISTS  post_images
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "postId" UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL
);
-- Post Images table indexes
CREATE INDEX idx_post_images_postId ON post_images("postId");

-- Down Migration
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS post_images;

DROP INDEX IF EXISTS idx_posts_userId;
DROP INDEX IF EXISTS idx_post_images_postId;