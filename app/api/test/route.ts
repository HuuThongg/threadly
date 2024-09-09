import { s3Client } from "@/aws"
import { ListBucketsCommand } from "@aws-sdk/client-s3"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  let result
  try {
    result = await s3Client.send(new ListBucketsCommand({}))
    console.log("Buckets:", result.Buckets)
  } catch (error) {
    return NextResponse.json({ error: "can not connect to blackblaze" }, { status: 401 })
    console.error("Error connecting to S3:", error)
  }
  return NextResponse.json({ hello: result })
}
