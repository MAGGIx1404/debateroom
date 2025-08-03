import formidable from "formidable";
import fs from "fs";
import { minioClient, bucketName } from "~~/server/utils/minio";
import prisma from "~~/lib/prisma";

export const config = {
  api: {
    bodyParser: false
  }
};

const _config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const userId = event.context.params.id;

  const form = formidable({ multiples: false });

  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const file = files.avatar;

    const fileStream = fs.createReadStream(files.avatar[0].filepath);
    const filename = `${userId}-${Date.now()}-${file.originalFilename}`;

    await minioClient.putObject(bucketName, filename, fileStream);

    const avatarUrl = `http://${_config.MINIO_HOST}:9000/${bucketName}/${filename}`;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl }
    });

    return { success: true, avatarUrl: updatedUser.avatarUrl };
  } catch (err) {
    console.error("Error uploading avatar:", err);
    return { success: false, error: err.message || "An error occurred while uploading the avatar." };
  }
});
