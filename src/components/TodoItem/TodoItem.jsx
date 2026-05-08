import { useState, useRef, useCallback } from 'react'
import { useDrag } from '@use-gesture/react'
import './TodoItem.less'

const SWIPE_THRESHOLD = 80 // 触发操作的滑动阈值

export default function TodoItem({ todo, onToggleComplete, onMarkDeleted }) {
  const [offsetX, setOffsetX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isReleased, setIsReleased] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [completing, setCompleting] = useState(false)
  const itemRef = useRef(null)

  const bind = useDrag(
    ({ movement: [mx], active, direction: [dx], velocity: [vx] }) => {
      // 如果已删除，不允许滑动
      if (todo.deleted) return

      setIsDragging(active)
      setIsReleased(!active)

      if (active) {
        // 限制滑动范围
        const clampedX = Math.max(-150, Math.min(150, mx))
        setOffsetX(clampedX)
      } else {
        // 快速滑动或超过阈值时触发操作
        const isFastSwipe = Math.abs(vx) > 0.5
        const isLeftSwipe = mx < -SWIPE_THRESHOLD || (isFastSwipe && dx < 0)
        const isRightSwipe = mx > SWIPE_THRESHOLD || (isFastSwipe && dx > 0)

        if (isLeftSwipe) {
          // 左滑 → 删除
          setOffsetX(-150)
          setTimeout(() => {
            setRemoving(true)
            setTimeout(() => {
              onMarkDeleted(todo.id)
              setRemoving(false)
              setOffsetX(0)
            }, 400)
          }, 200)
        } else if (isRightSwipe && !todo.completed) {
          // 右滑 → 完成
          setOffsetX(150)
          setCompleting(true)
          setTimeout(() => {
            onToggleComplete(todo.id)
            setCompleting(false)
            setOffsetX(0)
          }, 300)
        } else {
          // 回弹
          setOffsetX(0)
        }
      }
    },
    {
      axis: 'x',
      filterTaps: true,
      pointer: { touch: true },
      threshold: 5,
    }
  )

  const handleCheckboxClick = useCallback(() => {
    if (todo.deleted) return
    onToggleComplete(todo.id)
  }, [todo.id, todo.deleted, onToggleComplete])

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()
    if (isToday) {
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }

  // 判断背景层显示
  const showDeleteBg = offsetX < -20
  const showCompleteBg = offsetX > 20

  const contentClass = [
    'todo-item-content',
    isDragging ? 'dragging' : '',
    isReleased ? 'released' : '',
  ].filter(Boolean).join(' ')

  const itemClass = [
    'todo-item',
    removing ? 'removing' : '',
    completing ? 'completing' : '',
  ].filter(Boolean).join(' ')

  const textClass = [
    'todo-text',
    todo.completed ? 'completed' : '',
    todo.deleted ? 'deleted' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={itemClass} ref={itemRef}>
      {/* 背景操作层 */}
      {showDeleteBg && (
        <div className="todo-item-bg bg-delete">
          <span className="bg-label bg-label-delete">🗑 删除</span>
        </div>
      )}
      {showCompleteBg && (
        <div className="todo-item-bg bg-complete">
          <span className="bg-label bg-label-complete">✓ 完成</span>
        </div>
      )}

      {/* 前景内容层 */}
      <div
        className={contentClass}
        style={{ transform: `translateX(${offsetX}px)` }}
        {...bind()}
      >
        {/* 复选框 */}
        <div
          className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
          onClick={handleCheckboxClick}
        >
          {todo.completed && (
            <span className="check-icon">✓</span>
          )}
        </div>

        {/* 文本 */}
        <span className={textClass}>{todo.text}</span>

        {/* 时间 */}
        <span className="todo-time">{formatTime(todo.createdAt)}</span>
      </div>
    </div>
  )
}
