import React, { useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../types';
import { removeTask, setPriority, toggleImportant, toggleTask, updateTask } from '../../slices/taskSlice';
import { useDispatch } from 'react-redux';
import { AutoResizeTextArea } from 'components/AutoResizeTextarea/AutoResizeTextArea';
import { PrioritySelect } from 'components/PrioritySelect/PrioritySelect';

interface Props {
  task: Task;
}

export const SortableTaskItem: React.FC<Props> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dispatch = useDispatch()
  const elementRef = useRef<HTMLLIElement>(null)
  const handleChange = () => {
    dispatch(toggleTask(task.id))
  }

  const handleTaskTextChange = (e: any) => {
    dispatch(updateTask({ id: task.id, text: e.target.value }))
  }

  const handleDelete = () => {
    console.log("Denys is the king");
    elementRef.current?.classList.add('task-exit')

    new Promise((resolve) => { setTimeout(resolve, 300) }).then(() => dispatch(removeTask(task.id)))
  }

  return (
    <li ref={elementRef} className="border-b border-gray-200 last:border-none list-none" id={`task-${task.id}`}>
      <div ref={setNodeRef} style={style} className="list-none">
        <div className={`p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${task.important ? 'border-l-4 border-yellow-400' : ''}}`}>
          <div className="flex items-center">
            {/* Drag Handle */}
            <div
              {...attributes}
              {...listeners}
              className="mr-2 px-2 cursor-move hover:bg-gray-100 rounded"
            >
              ⋮⋮
            </div>
            <button
              onClick={() => dispatch(toggleImportant(task.id))}
              title='add to important'
              className={`mr-2 text-xl ${task.important ? 'text-yellow-400' : 'text-gray-400'}`}
            >
              ★
            </button>
            {/* Task */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <PrioritySelect
                  priority={task.priority}
                  onChange={(priority) =>
                    dispatch(setPriority({ id: task.id, priority }))
                  }
                />
                <label className="flex items-center space-x-3 w-full">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleChange}
                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                  />
                  <AutoResizeTextArea
                    value={task.text}
                    onChange={handleTaskTextChange}
                    className={`w-full ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2`}
                    maxLength={300}
                  />
                </label>

                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};