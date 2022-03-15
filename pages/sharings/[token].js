import useSWR from 'swr'
import { useRouter } from 'next/router'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Sharing() {
  const router = useRouter()
  const { token } = router.query
  console.log(token)
  const { data, error } = useSWR(`http://localhost:3000/sharings/${token}`, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  if (data.data) {
    var filesList = data.data.files.map((file) => {
      return(
        <li>
          <a href={file.url} target="_blank">{file.filename}</a>
        </li>
      )
    })
  }
  return (
    <ul>
      {filesList}
    </ul>
  )
}

// Get understand about why useSWR has fetched three times
