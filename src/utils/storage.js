import localforage from 'localforage'

const store = localforage.createInstance({
  name: 'todolist',
  storeName: 'todos',
  description: 'TodoList 本地数据存储',
})

const STORAGE_KEY = 'todos_data'

/**
 * 获取所有 todo
 */
export async function getTodos() {
  try {
    const data = await store.getItem(STORAGE_KEY)
    return data || []
  } catch (err) {
    console.error('读取数据失败:', err)
    return []
  }
}

/**
 * 保存所有 todo
 */
export async function saveTodos(todos) {
  try {
    await store.setItem(STORAGE_KEY, todos)
    return true
  } catch (err) {
    console.error('保存数据失败:', err)
    return false
  }
}
