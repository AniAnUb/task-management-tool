"use client";

import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { v4 as uuidv4 } from 'uuid';

const TaskInput: React.FC = () => {
    const [taskText, setTaskText] = useState('');
    const { dispatch } = useTasks();

    const addTask = () => {
        if (taskText.trim() === '') return;
        dispatch({
            type: 'ADD_TASK',
            payload: { id: uuidv4(), text: taskText, completed: false },
        });
        setTaskText('');
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
                placeholder="Add a new task"
            />
            <button
                onClick={addTask}
                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
                Add Task
            </button>
        </div>
    );
};

export default TaskInput;
