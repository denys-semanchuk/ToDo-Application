import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSortingByTime } from '../../slices/taskSlice';
import { RootState, SortType } from '../../types';

export const SortButton = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.tasks.sort);
  
  const handleSort = () => {
    dispatch(setSortingByTime());
  }

  return (
    <button 
      onClick={handleSort} 
      title='Sort Tasks'
      className={`
        p-2 
        rounded-full
        text-gray-600
        hover:text-white
        hover:bg-blue-600 
        transition-all 
        duration-400 
        transform 
        hover:scale-300
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-400 
        focus:ring-opacity-50
        ${sort === SortType.DESC ? 'rotate-180' : ''}
      `}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M5.293 7.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 1 1-1.414 1.414L10 4.414l-3.293 3.293a1 1 0 0 1-1.414 0z" 
          clipRule="evenodd" 
        />
      </svg>
    </button>
  )
}