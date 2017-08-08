import React, {Component} from 'react';
import TodoList from './todolist'
import Title from './title';
import TodoForm from './todoform';
window.id = 0;
export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			activeTodos: 0,
			completedTodos: 0
		}
		this.addTodo = this.addTodo.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleTodoStatus = this.handleTodoStatus.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleInputValue = this.handleInputValue.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}
	addTodo(val) {
		const todo = {text: val, id: window.id++, status: 'Active', isEditable: false}
		let active = this.state.activeTodos;
		this.state.data.push(todo);
		this.setState({data: this.state.data, activeTodos: active+1});
	}
	handleRemove(id, status) {
		let active = this.state.activeTodos;
		let completed = this.state.completedTodos;
		const remainder = this.state.data.filter((todo) => {
			if (todo.id !== id) {
				return todo;
			};
		});
		if (status === "Active") {
			active -= 1;
		} else {
			completed -= 1;
		}
		this.setState({data: remainder, activeTodos: active, completedTodos: completed});
	}
	handleTodoStatus(id, status) {
		const newStatus = status === 'Active' ? 'Completed': 'Active';
		const data = this.state.data;
		let active = this.state.activeTodos;
		let completed = this.state.completedTodos;
		for (var i = 0; i < data.length; i++) {
			if (data[i].id === id) {
				if (data[i].status === "Active") {
					active -= 1;
					completed += 1;
				} else {
					active += 1;
					completed -=1;
				}
				data[i].status = newStatus;
			}
		}
		this.setState({data, activeTodos: active, completedTodos: completed});
	}
	handleEdit(id) {
		let data = this.state.data;
		for (var i = 0; i < data.length; i++) {
			if (data[i].id === id) {
				data[i].isEditable = true;
			}
		}
		this.setState({data});
	}

	handleInputValue(evt, id) {
		let data = this.state.data;
		let newText = evt.target.value;
		for (var i = 0; i < data.length; i++) {
			if (data[i].id === id) {
				data[i].text = newText;
			}
		}
		this.setState({data});
	}

	handleSave(id) {
		let data = this.state.data;
		for (var i = 0; i < data.length; i++) {
			if (data[i].id === id) {
				data[i].isEditable = false;
			}
		}
		this.setState({data});
	}

	render () {
		return (
			<div>
				<Title />
				<TodoForm addTodo={this.addTodo}/>
				<TodoList 
					todos={this.state.data} 
					remove={this.handleRemove} 
					handleStatus={this.handleTodoStatus} 
					activeTodos={this.state.activeTodos}
					completedTodos={this.state.completedTodos}
					editTodo={this.handleEdit}
					handleInputValue={this.handleInputValue}
					handleSave={this.handleSave}
				/>
			</div>
		)
	}
}