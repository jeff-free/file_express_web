import { useState, useEffect } from 'react'

export default function FileInput ({ onFileInputChange }) {
  // const [filesUploaded, setFilesUploaded] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])

  const uploadFiles = (callback) => {
    return new Promise(resolve => {
      resolve(callback())
    })
  }

  useEffect(async () => {
    const { DirectUpload } = await import('@rails/activestorage')
    let fileBlobs = []
    let results = []
    for (let i = 0; i < selectedFiles.length; i++) {
      let file = selectedFiles.item(i)
      const uploader = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
      results.push(
        uploadFiles(() => {
          uploader.create((error, blob) => {
            if (error) {
              // Handle the error
            } else {
              fileBlobs.push(blob.signed_id)
            }
          })
        })
      )
    }
    Promise.all(results).then(() => {
      onFileInputChange({ files: fileBlobs })
    })
  }, [selectedFiles])

  return(
    <input type="file" multiple name="sharing[files]" onChange={(event) => setSelectedFiles(event.target.files)} />
  )
}
