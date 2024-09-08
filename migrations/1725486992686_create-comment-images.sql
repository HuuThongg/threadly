-- Up Migration

CREATE TABLE IF NOT EXISTS comment_images
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "commentId" UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  "blurHash" TEXT NOT NULL
);
CREATE INDEX idx_comment_images_commentId ON comment_images("commentId");
-- Down Migration
DROP INDEX IF EXISTS idx_comment_images_commentId
DROP TABLE IF EXISTS comments_images
