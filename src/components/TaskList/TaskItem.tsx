import React, { useRef } from 'react'
import { Task } from '../../types'
import { useDispatch } from 'react-redux'
import { removeTask, toggleTask } from '../../slices/taskSlice'


export const TaskItem = ({ task }: { task: Task }) => {
  const dispatch = useDispatch()
  const elementRef = useRef<HTMLLIElement>(null)
  const handleChange = () => {
    dispatch(toggleTask(task.id))
  }
  const handleDelete = () => {
    elementRef.current?.classList.add('task-exit')

    new Promise((resolve) => { setTimeout(resolve, 300) }).then(() => dispatch(removeTask(task.id)))
  }
  return (
    <li ref={elementRef} className="border-b border-gray-200 last:border-none" id={`task-${task.id}`}>
      <div className="task-enter flex items-center justify-between p-3 hover:bg-gray-50 transition-colors duration-150">

        <label className='flex items-center space-x-3 cursor-pointer'>
          <input
            type="checkbox"
            checked={task.completed} onChange={handleChange}
            className="w-4 h-4 accent-blue-500 cursor-pointer"
          />
          <span className={`${task.completed
            ? 'line-through text-gray-400'
            : 'text-gray-700'
            }`}>
            {task.text}
          </span>
        </label>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 p-1"
        >
          ✕
        </button>
      </div>
    </li>
  )
}