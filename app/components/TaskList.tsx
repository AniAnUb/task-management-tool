"use client";

import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
    const { state } = useTasks();
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const filteredTasks = state.tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    return (
        <div className="mb-8">
            <div className="flex mb-4">
                <button
                    className={`mr-2 px-3 py-1 rounded-md focus:outline-none ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={`mr-2 px-3 py-1 rounded-md focus:outline-none ${filter === 'active' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setFilter('active')}
                >
                    Active
                </button>
                <button
                    className={`px-3 py-1 rounded-md focus:outline-none ${filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </button>
            </div>
            <ul>
                {filteredTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
