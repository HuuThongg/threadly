
import React from 'react';
type CommentNode = {
  comment_id: string;
  post_id: string;
  user_id: string;
  user_handle: string;
  content: string;
  parent_comment_id?: string;
  created_at: string;
  images: { image_url: string; blurHash: string }[];
  replies: CommentNode[]; // For nested replies
};
type CommentProps = {
  comment: CommentNode;
};

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div style={{ marginLeft: comment.parent_comment_id ? '20px' : '0' }}>
      <div>
      </div>
      <p>{comment.content}</p>
      {comment.images.length > 0 && (
        <div>
          {comment.images.map((img, index) => (
            <div key={index}>

              <img className='aspect-square size-40' src={img.image_url} alt={`Image ${index}`} />

            </div>
          ))}
        </div>
      )}
      {comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <Comment key={reply.comment_id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
