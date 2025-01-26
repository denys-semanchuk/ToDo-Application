import React from 'react';
import { Priority } from '../../types';

interface Props {
  priority: Priority;
  onChange: (priority: Priority) => void;
}

export const PrioritySelect: React.FC<Props> = ({ priority, onChange }) => {
  const priorityColors = {
    [Priority.HIGH]: 'text-red-500',
    [Priority.MEDIUM]: 'text-yellow-500',
    [Priority.LOW]: 'text-green-500'
  };

  return (
    <select 
      value={priority}
      onChange={(e) => onChange(e.target.value as Priority)}
      className={`${priorityColors[priority]} border-none bg-transparent cursor-pointer`}
    >
      <option value={Priority.HIGH}>⚠ High</option>
      <option value={Priority.MEDIUM}>• Medium</option>
      <option value={Priority.LOW}>○ Low</option>
    </select>
  );
};