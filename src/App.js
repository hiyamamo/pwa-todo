import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoItem from './TodoItem.js'
import { getItems } from './api_client.js'

const ENTER_KEY = 13;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ''
    }
  }

  async getItems() {
    const response = await getItems();
    const todos = response.data.data.items;
    this.setState({
      todos: todos
    });
  }

  componentDidMount() {
    this.getItems();
  }

  handleChange = (e) => {
    this.setState({newTodo: e.target.value});
  }

  handleNewTodoKeyDown = (e) => {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }
    event.preventDefault();

    const val = this.state.newTodo.trim();

    if (val) {
      this.setState({ newTodo: '' });
    }
  }

  render() {
    const items = this.state.todos.map((t, idx) => {
      return (
        <TodoItem key={idx} todo={t} />
      )
    });
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>TODO with PWA</h2>
        </div>
        <div>
          <input
            value={this.state.newTodo}
            onChange={this.handleChange}
            onKeyDown={this.handleNewTodoKeyDown}
            autoFocus={true}
          />
          {items}
        </div>
      </div>
    );
  }
}

export default App;
