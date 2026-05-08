import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getTodos, saveTodos } from '../utils/storage'

/**
 * 自定义 Hook：管理 Todo 列表状态，自动持久化到 localforage
 */
export function useTodos() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  // 初始化：从本地存储加载数据
  useEffect(() => {
    getTodos().then((data) => {
      setTodos(data)
      setLoading(false)
    })
  }, [])

  // 数据变更时自动保存
  useEffect(() => {
    if (!loading) {
      saveTodos(todos)
    }
  }, [todos, loading])

  const addTodo = useCallback((text) => {
    if (!text.trim()) return
    const newTodo = {
      id: uuidv4(),
      text: text.trim(),
      completed: false,
      deleted: false,
      createdAt: Date.now(),
    }
    setTodos((prev) => [newTodo, ...prev])
  }, [])

  const toggleComplete = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }, [])

  const markDeleted = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, deleted: true } : todo
      )
    )
  }, [])

  const removeTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }, [])

  const clearDeleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.deleted))
  }, [])

  const activeTodos = todos.filter((t) => !t.completed && !t.deleted)
  const completedTodos = todos.filter((t) => t.completed && !t.deleted)
  const deletedTodos = todos.filter((t) => t.deleted)

  return {
    todos,
    loading,
    addTodo,
    toggleComplete,
    markDeleted,
    removeTodo,
    clearDeleted,
    activeTodos,
    completedTodos,
    deletedTodos,
  }
}
