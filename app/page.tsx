"use client";

import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { TaskProvider } from './context/TaskContext';

const Home: React.FC = () => {
    return (
        <TaskProvider>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Task Management Tool</h1>
                <TaskInput />
                <TaskList />
            </div>
        </TaskProvider>
    );
};

export default Home;
