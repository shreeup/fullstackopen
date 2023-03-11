import { useNavigate } from "react-router-dom";
import React from 'react'

import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const url = useField('text')

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      'content': content.value,
      'author': author.value,
      'url': url.value,
      'votes': 0
    })
   
    navigate("/");
  }

  const reset = () => {
    content.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input {...content} />
        </div>
        <div>
          author <input {...author} />
        </div>
        <div>
          url <input {...url} />
        </div>
        <div>
          <button type='submit'>create</button>
          <button type='button' onClick={reset}>reset</button>
        </div>
      </form>
    </div>
  )
}

export default CreateNew