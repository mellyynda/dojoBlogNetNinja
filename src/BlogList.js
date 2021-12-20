const BlogList = ({ blogs, title }) => {
  return (
    <div>
      <h1>{title}</h1>
      {blogs.map(blog => (
        <div className="blog-preview" key={blog.id}>
          <h2>{blog.title}</h2>
          <p>This blog was written by {blog.author}.</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;