import { useState } from 'react'
const BlogForm = ({createBlog}) => {
    const [newBlog, setNewBlog] = useState('')
    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
          title: newBlog["title"],
          author: newBlog["author"],
          url:newBlog["url"],
          likes:0
        }
        createBlog(blogObject);
        // blogService
        //   .create(blogObject)
        //     .then(returnedBlog => {
        //     setBlogs(blogs.concat(returnedBlog))
        //     setNewBlog({title:"",author:"",url:""})
        //     setErrorMessage(`a new blg ${blogObject["title"]} by ${blogObject["author"]} added.`)
        //   })
        setNewBlog({title:"",author:"",url:""})
      }

      const handleBlogChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
      
        setNewBlog((prevalue) => {
          return {
            ...prevalue,   // Spread Operator               
            [name]: value
          }
        })
      }
    


    return (
    <form onSubmit={addBlog}>
      <h4>Create new</h4>
      <label htmlFor="title">Title</label><input
        value={newBlog["title"]}
        name='title'
        onChange={handleBlogChange}
      /><br/>
      <label htmlFor="author">Author</label><input
        value={newBlog["author"]} name='author'
        onChange={handleBlogChange}
      /><br/>
      <label htmlFor="url">URL</label>
      <input
        value={newBlog["url"]} name='url'
        onChange={handleBlogChange}
      /><br/>
      <button type="submit">save</button>
    </form>  
  )
    }


export default BlogForm