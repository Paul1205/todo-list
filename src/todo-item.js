import React, { memo, useCallback, useState } from 'react';

export const TodoItem = memo(function TodoItem({todo, remove, handleStatus, isEditable, editTodo, handleSave}) {
	const { id, status, text } = todo;
	const [value, setValue] = useState(text);

	const handleOnChangeStatus = useCallback(() => {
		handleStatus(id, status);
	}, [handleStatus, id, status]);

	const handleOnClickEdit = useCallback(() => {
		editTodo(id, true);
	}, [editTodo, id]);

	const handleOnClickRemove = useCallback(() => {
		remove(id, status);
	}, [remove, id, status]);

	const handleOnSave = useCallback(() => {
		handleSave(id, value);
	}, [handleSave, id, value]);

	const handleOnChangeValue = useCallback((event) => {
		setValue(event.target.value);
	}, []);

	const handleOnCancel = useCallback(() => {
		editTodo(id, false);
		setValue(text);
	}, [editTodo, id, text]);

	return (
		<li className={`TodoItem ${isEditable ? 'isEditable' : 'isDisabled'}`}>
			<div className='TodoContent'>
			{
				!isEditable && (
					<input type="checkbox" className="TodoInputCheckbox" onChange={handleOnChangeStatus} />
				)
			}
			<input 
				type="text" 
				className={`TodoText ${status}`} 
				value={value} 
				onChange={handleOnChangeValue}
				disabled={!isEditable}
			/>
			</div>
			

			<div className='TodoActions'>
			{
				isEditable ? (
					<>
						<button onClick={handleOnSave}>Save</button>
						<button onClick={handleOnCancel}>Cancel</button>
					</>
				) : (
					<>
						<button className='EditButton' onClick={handleOnClickEdit}>Edit</button>
						<button className='TodoRemoveButton' title="remove todo" onClick= {handleOnClickRemove}>Delete</button>
					</>
				)
			}
			</div>
		</li>	
	)
});