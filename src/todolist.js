import React from 'react';
import Todo from './todoitem';
const TodoList = ({todos, remove, handleStatus, activeTodos, completedTodos, editTodo, handleInputValue, handleSave}) => {
	const TodoNode = todos.map((todo) => {
		return (
			<Todo 
				todo={todo} 
				key={todo.id} 
				remove={remove} 
				handleStatus={handleStatus} 
				isEditable={todo.isEditable} 
				editTodo={editTodo}
				handleInputValue={handleInputValue}
				handleSave={handleSave}
			/>
		)
	});
	return (
		<div>
			<ul>{TodoNode}</ul>
			<p>Active: {activeTodos}</p>
			<p>Completed: {completedTodos}</p>
		</div>
	);
};

export default TodoList;