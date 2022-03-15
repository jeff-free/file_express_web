// import { useState, useEffect } from 'react'
import FileInput from '../components/file_input'
import { useRouter } from 'next/router'

export default function SharingForm() {
  // const [fileBlobs, setFileBlobs] = useState([])
  const router = useRouter()
  const formData = { sharing: { files: [] } }
  const request =
    new Request('http://localhost:3000/sharings',
                { method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  } })
  const handleFileInputChanged = (fileBlobs) => {
    formData.sharing = fileBlobs
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch(request, { body: JSON.stringify(formData) })
    if (response.ok) {
      const data = await response.json()
      const token = JSON.parse(data.data).data.token
      router.push(`/sharings/${token}`)
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>
        Upload files:
        <FileInput onFileInputChange={handleFileInputChanged} />
      </label>
      <br />
      <button type="submit">Share Files</button>
    </form>
  )
}
