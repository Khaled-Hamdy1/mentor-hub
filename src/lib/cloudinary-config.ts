import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageToCloudinary(file: File, userId: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<{ url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: userId,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: "mentor-hub/users",
        resource_type: "image",
        filename_override: userId,
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({ url: result.secure_url });
      },
    );

    stream.end(buffer);
  });
}

export default cloudinary;
