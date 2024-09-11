"use client"
import React, { useState } from "react"
import { CommentNode } from "./page"
type CommentProps = {
  comment: CommentNode
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div style={{ marginLeft: comment.parent_comment_id ? "20px" : "0" }}>
      <p>{comment.user_handle || "userhandle"}</p>
      <p>{comment.content}</p>
      {comment.images.length > 0 && (
        <div>
          {comment.images.map((img, index) => (
            <div key={index}>
              <img
                className="aspect-square size-40"
                src={img.image_url}
                alt={`Image ${index}`}
              />
            </div>
          ))}
        </div>
      )}
      {comment.replies.length > 0 ? (
        <div onClick={() => setOpen(!isOpen)}>view {comment.replies.length} reply</div>
      ) : null}

      {isOpen
        ? comment.replies.length > 0 && (
            <div>
              {comment.replies.map((reply) => (
                <Comment key={reply.comment_id} comment={reply} />
              ))}
            </div>
          )
        : null}
    </div>
  )
}

export default Comment
