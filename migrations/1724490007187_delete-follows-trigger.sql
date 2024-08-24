-- Up Migration

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
-- Down Migration

-- Drop the trigger from the users table
DROP TRIGGER IF EXISTS delete_follows_trigger ON users;

-- Drop the function that was created for the trigger
DROP FUNCTION IF EXISTS delete_follows_on_user_deletion();
