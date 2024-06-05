"use client";

import React from 'react';
import { Task } from '../types/task';
import { useTasks } from '../context/TaskContext';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
    const { dispatch } = useTasks();

    return (
        <li className="flex items-center mb-2">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
                className="mr-2"
            />
            <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>
        {task.text}
      </span>
            <button
                onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
                Delete
            </button>
        </li>
    );
};

export default TaskItem;
