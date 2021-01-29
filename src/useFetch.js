import { useEffect, useState } from 'react'

const useFetch = url => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortContrl = new AbortController()

    setTimeout(() => {
      fetch(url, { signal: abortContrl.signal })
        .then(res => {
          // console.log(res)
          if (!res.ok) {
            throw Error('unable to fatch the data from that resource.')
          }
          return res.json()
        })
        .then(data => {
          setIsPending(false)
          setData(data)
          setError(null)
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('Fetch aborted.')
          } else {
            setIsPending(false)
            setError(err.message)
          }
        })
    }, 1000)

    return () => abortContrl.abort()
  }, [url])

  return { data, isPending, error }
  
}

export default useFetch
