import React from 'react';
const Todo = ({todo, remove, handleStatus, isEditable, editTodo, handleInputValue, handleSave}) => {
	if (isEditable) {
		return (
			<li className="TodoItem">
				<input 
					type="text" 
					className={"TodoText "+ todo.status} 
					defaultValue={todo.text} 
					value={todo.text} 
					onChange={(evt) => {handleInputValue(evt, todo.id)}}
				/>
				<button onClick={() => {handleSave(todo.id)}}>Save</button>
				<button>Cancel</button>
			</li>
		)
	} else {
		return (
			<li className="TodoItem">
				<input type="checkbox" className="TodoInputCheckbox" onChange={() =>{handleStatus(todo.id, todo.status)}}/>
				<span className={"TodoText "+ todo.status} onClick={()=>{editTodo(todo.id)}}>{todo.text}</span>
				<span className="TodoRemoveButton" title="remove todo" onClick= {()=>{remove(todo.id, todo.status)}}>x</span>
			</li>
		);
	}
	
}
export default Todo;