import { useState, useCallback } from 'react'
import './TodoInput.less'

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!text.trim()) return
      onAdd(text)
      setText('')
    },
    [text, onAdd]
  )

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleSubmit(e)
      }
    },
    [handleSubmit]
  )

  return (
    <form className="todo-input-wrapper" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="添加新的待办事项..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={200}
      />
      <button
        className="todo-submit-btn"
        type="submit"
        disabled={!text.trim()}
        aria-label="添加待办"
      >
        +
      </button>
    </form>
  )
}
