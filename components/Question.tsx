'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState('')
  const [response, setResponse] = useState('')

  const onChangeHandler = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    const answer = await askQuestion(value)
    setResponse(answer)
    setValue('')
    setLoading(false)
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          disabled={loading}
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
      {loading && <div>...loading</div>}
      {response && <div>{response}</div>}
    </div>
  )
}

export default Question
