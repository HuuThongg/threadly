-- Up Migration

CREATE TABLE IF NOT EXISTS verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
  
  PRIMARY KEY(identifier, token)
);


CREATE TABLE IF NOT EXISTS users
(
 id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  handle VARCHAR(255) UNIQUE  NULL,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  bio TEXT,
  gender TEXT,
  onboarding_complete BOOLEAN DEFAULT FALSE,
 search_vector tsvector 
);

UPDATE users 
SET search_vector = to_tsvector('english',name || ' '|| handle);

CREATE INDEX idx_search_vector ON users USING GIN(search_vector);

-- Users table indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_handle ON users(handle);

CREATE TABLE IF NOT EXISTS accounts
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

CREATE TABLE IF NOT EXISTS  sessions
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES users(id),
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL UNIQUE
);



-- Down Migration
DROP INDEX IF EXISTS idx_search_vector;
DROP INDEX IF EXISTS  idx_users_email;
DROP INDEX IF EXISTS  idx_users_handle;
-- Drop tables in reverse order of creation to avoid dependency issues
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS verification_token CASCADE;



