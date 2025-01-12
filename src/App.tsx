import React from 'react';
import { TaskList } from './components/TaskList/TaskList';
import { TaskForm } from './components/TaskForm/TaskForm';
import { FilterButtons } from './components/FilterButtons/FilterButtons';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo App</h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <TaskForm />
          <FilterButtons />
          <div className="mt-6">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;