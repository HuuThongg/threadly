import { Post } from "./Post";

export default function Posts() {
  return (
    <div className="relative flex flex-col">
      {[...Array(5)].map((_, index) => (
        <Post key={index} />
      ))}
    </div>
  )
}
