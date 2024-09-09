import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3"

const s3ClientConfig: S3ClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: process.env.AWS_REGION,
  endpoint: process.env.STORAGE_ENDPOINT!,
  forcePathStyle: true,
}

export const s3Client = new S3Client(s3ClientConfig)
