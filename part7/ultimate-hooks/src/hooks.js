import { useState } from 'react'

export const useResource = (url) => {
    const [value, setValue] = useState('')
  
    const create = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  
  