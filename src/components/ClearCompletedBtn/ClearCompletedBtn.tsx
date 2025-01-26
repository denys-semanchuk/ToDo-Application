import React from 'react'
import { useDispatch } from 'react-redux'
import { clearCompleted } from 'slices/taskSlice'
import { Task } from 'types'

type Props = {
  tasks: Task[]
}

export const ClearCompletedBtn = ({ tasks }: Props) => {
  const dispatch = useDispatch();
  return (
    <>
      {tasks.some(task => task.completed) && (
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to clear completed tasks?')) {
              dispatch(clearCompleted());
            }
          }}
          className="mt-4 px-4 py-2 text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          Clear completed tasks
        </button>
      )}
    </>
  )
}