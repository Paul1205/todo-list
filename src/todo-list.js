import React, { memo } from 'react';
import { TodoItem } from './todo-item';

export const TodoList = memo(function TodoList({todos, remove, handleStatus, activeTodos, completedTodos, editTodo, handleSave}) {
	return (
		<div>
			<ul>
				{
					todos.map((todo) => {
						return (
							<TodoItem 
								todo={todo} 
								key={todo.id} 
								remove={remove} 
								handleStatus={handleStatus} 
								isEditable={todo.isEditable} 
								editTodo={editTodo}
								handleSave={handleSave}
							/>
						)
					})
				}
			</ul>
			<p>Active: {activeTodos}</p>
			<p>Completed: {completedTodos}</p>
		</div>
	);
});