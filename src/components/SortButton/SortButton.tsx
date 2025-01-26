import React from 'react'
import { useDispatch } from 'react-redux'
import { setSortingByTime } from '../../slices/taskSlice';


export const SortButton = () => {
  const dispatch = useDispatch();
  const handleSort = () => {
    dispatch(setSortingByTime());
  }
  return (
    <button onClick={handleSort}>^</button>
  )
}