import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterType, RootState } from '../../types';
import { setFilter } from '../../slices/taskSlice';

export const FilterButtons = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);

  return (
    <div className="flex gap-2 justify-center my-4">
      {Object.values(FilterType).map((filter) => (
        <button
          key={filter}
          onClick={() => dispatch(setFilter(filter))}
          className={`px-4 py-2 rounded ${
            currentFilter === filter
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};
