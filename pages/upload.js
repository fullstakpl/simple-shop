import { useState } from "react";

const BUCKET_URL = process.env.PUBLIC_S3_BUCKET_URL;

const Upload = () => {
  const [uploadedFileUrl, setFileUrl] = useState();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const response = await fetch("/api/s3", {
      method: "POST",
      body: JSON.stringify({
        type: file.type,
        name: file.name
      })
    })

    const { url } = await response.json();
    await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-type": file.type
      }
    })

    setFileUrl(`${BUCKET_URL}/${file.name}`)
  }

  return (
    <div>
      <p>Select file to upload</p>
      <input type='file' onChange={handleUpload} />
      {uploadedFileUrl && <img src={uploadedFileUrl} />}
    </div>
  )
}

export default Upload;
