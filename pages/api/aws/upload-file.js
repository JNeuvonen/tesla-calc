import middleware from "middleware/middleware";
import nextConnect from "next-connect";
import AWS from "aws-sdk";
import fs from "fs";

const handler = nextConnect();
handler.use(middleware);

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_PRIVATE_KEY,
  },
});

handler.post(async (req, res) => {
  try {
    const file = req.files.file[0];
    const imagePath = file.path;
    const blob = fs.readFileSync(imagePath);

    const uploadedImage = await s3
      .upload({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: file.originalFilename,
        Body: blob,
        ContentType: "image/png",
      })
      .promise();

    res.status(200).send({ message: uploadedImage.Location });
  } catch (err) {
    console.log(err);

    res.statusCode(200).send({ message: err });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
