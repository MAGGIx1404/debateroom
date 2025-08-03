import formidable from "formidable";
import fs from "fs";
import { minioClient, bucketName } from "~~/server/utils/minio";
import prisma from "~~/lib/prisma";

let avatarUrl = null;
let bannerUrl = null;

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

    const avatar = files.avatar;
    if (avatar && avatar.length > 0) {
      const fileStream = fs.createReadStream(avatar[0].filepath);
      const filename = `${userId}-${Date.now()}-${avatar[0].originalFilename}`;
      await minioClient.putObject(bucketName, filename, fileStream);
      avatarUrl = `http://localhost:9000/${bucketName}/${filename}`;
    }

    const banner = files.banner;
    if (banner && banner.length > 0) {
      const fileStream = fs.createReadStream(banner[0].filepath);
      const filename = `${userId}-${Date.now()}-${banner[0].originalFilename}`;
      await minioClient.putObject(bucketName, filename, fileStream);
      bannerUrl = `http://localhost:9000/${bucketName}/${filename}`;
    }

    const payload = {
      username: fields.username[0],
      name: fields.name[0],
      description: fields.description[0]
    };

    if (avatarUrl) {
      payload.avatarUrl = avatarUrl;
    }

    if (bannerUrl) {
      payload.bannerUrl = bannerUrl;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: payload
    });

    return {
      success: true,
      user: updatedUser
    };
  } catch (err) {
    console.error("Error parsing form data:", err);
    return {
      statusCode: 400,
      body: { success: false, error: "Failed to parse form data." }
    };
  }
});
