"use client"
import { useState } from "react"

interface OnboardingProps {
  userId: string
}

const OnboardingPage = ({ userId }: OnboardingProps) => {
  const [handle, setHandle] = useState("")
  const [bio, setBio] = useState("")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("handle", handle)
    formData.append("bio", bio)
    if (profileImage) {
      formData.append("profileImage", profileImage)
    }

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to complete onboarding")
      }

      // Redirect or inform the user that onboarding is complete
      window.location.href = "/" // Redirect to the home page or another page
    } catch (err) {
      setError("Failed to complete onboarding")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Complete Your Onboarding</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Handle Name:
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Bio:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <br />
        <label>
          Profile Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default OnboardingPage
