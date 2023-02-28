import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable.js'
import BlogForm from './components/BlogForm'

const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
 
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
    }
    else
    setBlogs([]);
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blg ${blogObject["title"]} by ${blogObject["author"]} added.`)
      })
  }

  const increaselike=(blogObject)=>{
    blogObject["likes"]=blogObject["likes"]+1;
    blogService.update(blogObject).
    then(returnedBlog=>{
      //setBlogs(...blogs,blogObject);
     
      setBlogs(blogs.map((item) => {
          return item.id === returnedBlog.id? returnedBlog: item;
      }))
      setErrorMessage(`like added.`)
    })
  }
  

  const removeBlog=(blogObject)=>{
    if (window.confirm("Are you sure you want to delete?") == true) {
      blogService.remove(blogObject.id).then(()=>{
        setBlogs(blogs.filter(b=>b.id!=blogObject.id))
        setErrorMessage(`like added.`)
      })
    } 
  }
  const handlelogout=(event)=>{
    setUser(null);
    setBlogs([])
    blogService.setToken('');
    window.localStorage.clear()
  }
  

  // const blogsToShow = showAll
  //   ? blogs
  //   : blogs.filter(note => note.important)
    const blogsToShow = blogs
    const loginForm = () => {
      const hideWhenVisible = { display: loginVisible ? 'none' : '' }
      const showWhenVisible = { display: loginVisible ? '' : 'none' }
  
      return (
        <div>
          <Togglable buttonLabel='login'>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
            <button onClick={() => setLoginVisible(false)}>cancel</button>
            </Togglable>
        </div>
      )
    }
    

  return (
    <div>
      <h1>Blogs app</h1>
      <Notification message={errorMessage} />

      {!user &&  <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> } 
      {user && <div>
        <p>{user.name} logged in &nbsp; 
        <button type="button" onClick={handlelogout}>logout</button></p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      } 
 
      <ul>
        <ul>
          {blogsToShow.map(blog => 
            <Blog
              key={blog.id}
              blog={blog}
              addlike={() => increaselike(blog)}
              removeBlog={()=>removeBlog(blog)}
            />
          )}
        </ul>
      </ul>

      <Footer />
    </div>
  )
}

export default App