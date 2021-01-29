import { useState } from "react"
import { useHistory } from 'react-router-dom'

const Create = () => {

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('Luffy')
  const [isPending, setIsPending] = useState(false)

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault() 
    const blog = { title, body, author }

    setIsPending(true)

    fetch(
      'http://localhost:8000/blogs', 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(blog) 
      }
    ).then ( () => { 
      console.log('New blog post added💩')
      setIsPending(false)
      history.push('/')
    })
  }

  return (
    <div className="create">
      <h2>Add New Blog 👨🏻‍💻</h2>
      <form onSubmit={ handleSubmit }>
        <label>Blog Title:</label>
        <input 
          type="text"
          required
          value={ title }
          onChange={ (e) => setTitle(e.target.value) }
        />
        <label>Blog Body:</label>
        <textarea
          required
          value={ body }
          onChange={ (e) => setBody(e.target.value) }
        >
        </textarea>
        <select
          value={author}
          onChange={ (e) => setAuthor(e.target.value) }
        >
          <option value="Luffy">Luffy🍖</option>
          <option value="Zoro">Zoro🍺</option>
        </select>
        { !isPending && <button>Add Blog</button>}
        { isPending && <button disabled>Adding Blog ... 👨🏼‍💻👨🏼‍💻👨🏼‍💻</button>}
      </form>
    </div>
  )
}

export default Create