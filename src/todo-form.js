import React, { memo, useCallback, useState } from 'react';
export const TodoForm = memo(function TodoForm({ addTodo }) {
	const [value, setValue] = useState('');
	const handleOnChange = useCallback((event) => {
		setValue(event.target.value);
	}, []);

	const handeleOnclick = useCallback(() => {
		addTodo(value);
		setValue('');
	}, [addTodo, value]);

	return (
		<div>
			<input value={value} onChange={handleOnChange} placeholder='Insert your todo' />
			<button onClick={handeleOnclick}>
				Add
			</button>
		</div>
	);
});