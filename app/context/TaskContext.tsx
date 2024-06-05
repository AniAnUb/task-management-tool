"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Task } from '../types/task';

interface TaskState {
    tasks: Task[];
}

type Action =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'TOGGLE_TASK'; payload: string }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'SET_TASKS'; payload: Task[] };

interface TaskContextProps {
    state: TaskState;
    dispatch: React.Dispatch<Action>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const taskReducer = (state: TaskState, action: Action): TaskState => {
    switch (action.type) {
        case 'ADD_TASK':
            return { tasks: [...state.tasks, action.payload] };
        case 'TOGGLE_TASK':
            return {
                tasks: state.tasks.map(task =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                ),
            };
        case 'DELETE_TASK':
            return { tasks: state.tasks.filter(task => task.id !== action.payload) };
        case 'SET_TASKS':
            return { tasks: action.payload };
        default:
            return state;
    }
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, { tasks: [] });

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        dispatch({ type: 'SET_TASKS', payload: storedTasks });
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }, [state.tasks]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = (): TaskContextProps => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};
