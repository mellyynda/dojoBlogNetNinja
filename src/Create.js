import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('yoshi')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
    const blog = { title, body, author }
    setIsLoading(true)

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(blog)
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not send data')
        }
        setIsLoading(false)
        history.push('/')
        console.log('Created new blog.')
      })
      .catch(err => {
        setError(err.message)
        setIsLoading(false)
      })
  }

  return (
    <div className="create">
      <h2>Add a new Blog </h2>
      <form
        onSubmit={handleSubmit}
      >
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={e => setBody(e.target.value)}
        ></textarea>
        <label>Author:</label>
        <select
          required
          value={author}
          onChange={e => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {isLoading && <button disabled>Loading...</button>}
        {!isLoading && <button>Add Blog</button>}
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default Create;