import Togglable from './Togglable';

const Blog = ({blog,addlike,removeBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
  <div style={blogStyle}>
    {blog.title}
    <Togglable buttonLabel='View'>
    <p>
    {blog.author}<br/>
    {blog.url}
    <br/>
    Likes {blog.likes} <button onClick={addlike}>Like</button>
    <br/>
    {blog.user}
    <br/>
    <button onClick={removeBlog}>Remove</button>
    </p>
    
    </Togglable>
  </div>  
)}

export default Blog