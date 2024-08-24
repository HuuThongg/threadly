CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Apply the trigger to the comments table 
CREATE TRIGGER update_comment_timestamp
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_timestamp()

-- Apply the trigger to the posts table
CREATE TRIGGER update_post_timestamp
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();;






CREATE OR REPLACE FUNCTION delete_orphaned_comments() 
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM comments WHERE "postId" = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to the posts table
CREATE TRIGGER delete_orphaned_comments_trigger
AFTER DELETE ON posts
FOR EACH ROW
EXECUTE FUNCTION delete_orphaned_comments();




CREATE OR REPLACE FUNCTION delete_follows_on_user_deletion() 
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM follows WHERE "followerId" = OLD.id OR "followingId" = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to the users table
CREATE TRIGGER delete_follows_trigger
AFTER DELETE ON users
FOR EACH ROW
EXECUTE FUNCTION delete_follows_on_user_deletion();
