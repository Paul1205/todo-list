import React, { memo, useCallback, useState } from 'react';
import { TodoList } from './todo-list'
import { Title } from './title';
import { TodoForm } from './todo-form';

export const Board = memo(function Board() {
	const [data, setData] = useState([]);
	const [activeTodos, setActiveTodos] = useState(0);
	const [completedTodos, setCompletedTodos] = useState(0);

	const addTodo = useCallback((name) => {
		const todo = {
			text: name,
			id: Math.round(Math.random() * 100),
			status: 'Active',
			isEditable: false,
		};
		setData([...data, todo]);
		setActiveTodos(activeTodos+1);
	}, [data, activeTodos]);

	const handleRemove = useCallback((id, status) => {
		setData(data.filter((item) => item.id !== id));
		
		if (status === 'Active') {
			setActiveTodos(activeTodos - 1);
		} else {
			setCompletedTodos(completedTodos - 1);
		}
	}, [data, completedTodos, activeTodos]);

	const handleTodoStatus = useCallback((id, status) => {
		const newStatus = status === 'Active' ? 'Completed': 'Active';
		const todoIndex = data.findIndex((item) => item.id === id);

		if (todoIndex !== -1) {
			let newData = [...data];
			newData[todoIndex] = {
				...newData[todoIndex],
				status: newStatus,
			};

			setData(newData);

			if (newStatus === 'Active') {
				setActiveTodos(activeTodos + 1);
				setCompletedTodos(completedTodos - 1);
			} else {
				setActiveTodos(activeTodos - 1);
				setCompletedTodos(completedTodos + 1);
			}
		}
	}, [data, completedTodos, activeTodos]);

	const handleEdit = useCallback((id, isEditable) => {
		const todoIndex = data.findIndex((item) => item.id === id);

		if (todoIndex !== -1) {
			const newData = [...data];
			newData[todoIndex] = {
				...newData[todoIndex],
				isEditable,
			};

			setData(newData);
		}
	}, [data]);

	const handleSave = useCallback((id, value) => {
		const todoIndex = data.findIndex((item) => item.id === id);

		if (todoIndex !== -1) {
			const newData = [...data];
			newData[todoIndex] = {
				...newData[todoIndex],
				text: value,
				isEditable: false,
			};

			setData(newData);
		}
	}, [data]);

	return (
		<div>
			<Title />
			<TodoForm addTodo={addTodo}/>
			<TodoList 
				todos={data} 
				remove={handleRemove} 
				handleStatus={handleTodoStatus} 
				activeTodos={activeTodos}
				completedTodos={completedTodos}
				editTodo={handleEdit}
				handleSave={handleSave}
			/>
		</div>
	)
})