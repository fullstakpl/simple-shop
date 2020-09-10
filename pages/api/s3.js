import S3 from "aws-sdk/clients/s3"

const s3 = new S3({
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET,
  signatureVersion: "v4"
})


export default async (req, res) => {
  const { type, name } = JSON.parse(req.body)
  const fileParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: name,
    Expires: 600,
    ContentType: type,
    ACL: "public-read"
  };

  const url = await s3.getSignedUrlPromise("putObject", fileParams);

  res.statusCode = 200;
  res.json({ url });
}
