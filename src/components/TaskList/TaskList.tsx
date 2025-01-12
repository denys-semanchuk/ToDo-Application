import React, { useState } from 'react'
import { FilterType, RootState, Task } from '../../types'
import { TaskItem } from './TaskItem'
import { useSelector } from 'react-redux'
import { Notification } from '../Notification/Notification'


export const TaskList: React.FC = () => {
  const [error, setError] = useState<string | null>(null)

  const { tasks, filter } = useSelector((state: RootState) => {
    try {
      return state.tasks;
    } catch (err) {
      setError('Failed to load tasks');
      return { tasks: [], filter: FilterType.ALL };
    }
  });
  if (error) {
    return <Notification message={error} type="error" />;
  }

  if (!Array.isArray(tasks)) {
    return <Notification message="Invalid tasks data" type="error" />;
  }

  if (tasks.length === 0) {
    return <Notification message="No tasks yet" type="success" />;
  }
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case FilterType.ACTIVE:
        return !task.completed;
      case FilterType.COMPLETED:
        return task.completed;
      default:
        return true;
    }
  });

  return (
    <div className="min-w-full max-w-md p-4 bg-white rounded-lg shadow">
      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <TaskItem task={task} key={task.id} />
        ))}
      </ul>
    </div>
  )
}