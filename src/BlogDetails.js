import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(`http://localhost:8000/blogs/${id}`)
  const history = useHistory()

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog?') == true) {
      fetch('http://localhost:8000/blogs/' + id, {
        method: 'DELETE'
      })
        .then(res => {
          if (!res.ok) {
            throw Error('Could not delete the blog.')
          }
          window.alert('Blog successfully deleted.')
          history.push('/')
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  return (
    <div className="blog-details">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data &&
        <article>
          <h2>{data.title} </h2>
          <p>Written by {data.author}</p>
          <div>{data.body}</div>
          <button onClick={handleDelete}>delete</button>
        </article>
      }
    </div>
  );
}

export default BlogDetails;