import { useTodos } from '../../hooks/useTodos'
import TodoItem from '../TodoItem/TodoItem'
import TodoInput from '../TodoInput/TodoInput'
import './TodoList.less'

export default function TodoList() {
  const {
    loading,
    addTodo,
    toggleComplete,
    markDeleted,
    clearDeleted,
    activeTodos,
    completedTodos,
    deletedTodos,
  } = useTodos()

  const totalCount = activeTodos.length + completedTodos.length + deletedTodos.length

  return (
    <>
      {/* 背景装饰 */}
      <div className="app-bg">
        <div className="bg-circle bg-circle-1" />
        <div className="bg-circle bg-circle-2" />
        <div className="bg-circle bg-circle-3" />
      </div>

      <div className="todo-list-container">
        {/* 头部 */}
        <header className="todo-header">
          <h1 className="todo-title">Todo List</h1>
          <p className="todo-subtitle">← 右滑完成 · 左滑删除 →</p>
        </header>

        {/* 输入区域 */}
        <div className="todo-input-section">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* 统计栏 */}
        {totalCount > 0 && (
          <div className="todo-stats">
            <div className="stats-left">
              <div className="stat-item">
                <span className="stat-dot stat-dot-active" />
                <span className="stat-count">{activeTodos.length}</span>
                <span>待办</span>
              </div>
              <div className="stat-item">
                <span className="stat-dot stat-dot-done" />
                <span className="stat-count">{completedTodos.length}</span>
                <span>完成</span>
              </div>
              {deletedTodos.length > 0 && (
                <div className="stat-item">
                  <span className="stat-dot stat-dot-del" />
                  <span className="stat-count">{deletedTodos.length}</span>
                  <span>已删</span>
                </div>
              )}
            </div>
            {deletedTodos.length > 0 && (
              <div className="stats-right">
                <button className="clear-btn" onClick={clearDeleted}>
                  清除已删
                </button>
              </div>
            )}
          </div>
        )}

        {/* 加载状态 */}
        {loading && (
          <div className="todo-loading">
            <div className="loading-spinner" />
          </div>
        )}

        {/* 待办列表 */}
        {!loading && (
          <div className="todo-list">
            {/* 进行中 */}
            {activeTodos.length > 0 && (
              <>
                {completedTodos.length > 0 && (
                  <div className="section-label">进行中</div>
                )}
                {activeTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={toggleComplete}
                    onMarkDeleted={markDeleted}
                  />
                ))}
              </>
            )}

            {/* 已完成 */}
            {completedTodos.length > 0 && (
              <>
                <div className="section-label">已完成</div>
                {completedTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={toggleComplete}
                    onMarkDeleted={markDeleted}
                  />
                ))}
              </>
            )}

            {/* 已删除 */}
            {deletedTodos.length > 0 && (
              <>
                <div className="section-label">已删除</div>
                {deletedTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={toggleComplete}
                    onMarkDeleted={markDeleted}
                  />
                ))}
              </>
            )}

            {/* 空状态 */}
            {totalCount === 0 && (
              <div className="todo-empty">
                <div className="empty-icon">📝</div>
                <div className="empty-text">暂无待办事项</div>
                <div className="empty-hint">输入内容开始添加吧</div>
              </div>
            )}
          </div>
        )}

        {/* 滑动提示 */}
        {!loading && totalCount > 0 && (
          <div className="swipe-hint">
            <span className="hint-item">
              <span className="hint-arrow">→</span> 右滑完成
            </span>
            <span className="hint-item">
              左滑删除 <span className="hint-arrow">←</span>
            </span>
          </div>
        )}
      </div>
    </>
  )
}
