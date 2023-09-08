'use client'

import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState()

  const onChangeHandler = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
          type="text"
          placeholder="Ask a question"
          value={value}
          onChange={onChangeHandler}
        />
        <button
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>
    </div>
  )
}

export default Question
