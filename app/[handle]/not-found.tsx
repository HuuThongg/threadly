import Link from "next/link"

export default function NotFound() {
  return (
    <div className="pl-20">
      <h2>Not Found</h2>
      <p>The user does not exist</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
