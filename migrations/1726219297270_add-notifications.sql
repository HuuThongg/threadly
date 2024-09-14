-- Up Migration
CREATE TABLE IF NOT EXISTS notifications{
  id UUID PRIMARY KEY,
    recipient_id UUID REFERENCES users(id),  
    actor_id UUID REFERENCES users(id),     
    post_id UUID REFERENCES posts(id),      
    type VARCHAR(50),                      
    message TEXT,                          
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
  }; 
-- Down Migration
DROP TABLE IF EXISTS notifications;
