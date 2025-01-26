import React, { useState } from 'react'
import { FilterType, RootState, SortType } from '../../types'
import { useSelector, useDispatch } from 'react-redux'
import { Notification } from '../Notification/Notification'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableTaskItem } from './SortableTaskItem';
import { clearCompleted, reorderTasks } from 'slices/taskSlice';

export const TaskList: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const { tasks, filter } = useSelector((state: RootState) => {
    try {
      return state.tasks;
    } catch (err) {
      setError('Failed to load tasks');
      return { tasks: [], filter: FilterType.ALL, sort: SortType.ASC };
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
      case FilterType.IMPORTANT:
        return task.important;
      default:
        return true;
    }
  });



  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const oldIndex = filteredTasks.findIndex((task) => task.id === active.id);
      const newIndex = filteredTasks.findIndex((task) => task.id === over.id);

      console.log('oldIndex', oldIndex);
      console.log('newIndex', newIndex);
      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedTasks = [...tasks];
        const oldGlobalIndex = tasks.findIndex(task => task.id === filteredTasks[oldIndex].id);
        const newGlobalIndex = tasks.findIndex(task => task.id === filteredTasks[newIndex].id);

        const [movedTask] = reorderedTasks.splice(oldGlobalIndex, 1);
        reorderedTasks.splice(newGlobalIndex, 0, movedTask);

        dispatch(reorderTasks(reorderedTasks));
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
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
      <SortableContext
        items={filteredTasks.map(task => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <SortableTaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};