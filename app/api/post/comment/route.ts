import { auth } from "@/auth"
import { encode } from "blurhash"
import sharp from "sharp"
import { v4 as uuidv4 } from "uuid"
import { NextRequest, NextResponse } from "next/server"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { s3Client } from "@/aws"
import { createComment, createPost } from "@/db/query"

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "User is not authenticated" }, { status: 401 })
  }

  const user_id = session.user?.id
  if (!user_id) {
    return NextResponse.json({ error: "User is not authenticated" }, { status: 401 })
  }

  const formData = await request.formData()
  const files = formData.getAll("images") as File[]

  const imagesUrls: string[] = []
  const blurHashes: string[] = []

  for (const file of files) {
    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }
    const arrayBuffer = await file.arrayBuffer()
    const imageBuffer = Buffer.from(arrayBuffer)
    // Resize the image
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(800)
      .jpeg({ quality: 80 })
      .toBuffer()

    // Generate a unique file name
    const imageId = uuidv4()
    const fileName = `${imageId}.jpg`

    // Upload the image to Backblaze B2
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.POST_IMAGE_BUCKET!,
      Key: fileName,
      Body: resizedImageBuffer,
      ContentType: "image/jpeg",
    })
    const uploadResponse = await s3Client.send(uploadCommand)
    if (!uploadResponse) {
      return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
    }

    // Generate public URL
    const imageUrl = `https://${process.env.POST_IMAGE_BUCKET!}.s3.us-west-002.backblazeb2.com/${fileName}`
    imagesUrls.push(imageUrl)

    // Generate BlurHash
    const blurhash = await generateBlurHash(imageBuffer)
    blurHashes.push(blurhash)
  }

  // Handle content
  const content = (formData.get("content") as string) || null || undefined
  const post_id = formData.get("post_id") as string
  const parent_comment_id =
    (formData.get("parent_comment_id") as string) || null || undefined
  console.log("postId", post_id)
  console.log("content,", content)
  console.log("parentCommentId", parent_comment_id)
  // Create the post
  await createComment({
    user_id,
    post_id,
    parent_comment_id,
    content,
    images: imagesUrls,
    blur_hashes: blurHashes,
  })

  return NextResponse.json({ success: true }, { status: 201 })
}

// Utility function to generate BlurHash
async function generateBlurHash(imageBuffer: Buffer) {
  const { data, info } = await sharp(imageBuffer)
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: "inside" })
    .toBuffer({ resolveWithObject: true })

  return encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4)
}
