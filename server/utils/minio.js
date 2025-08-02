import { Client } from "minio";

export const minioClient = new Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "iXlII33tmX35OOh2QNmi",
  secretKey: "bJUqcdnkRs0TzlPyOirIcg9uPysRJa69AlKtIdEc"
});

export const bucketName = "avatars";

// Ensure bucket exists
(async () => {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) await minioClient.makeBucket(bucketName, "us-east-1");
})();
