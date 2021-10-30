// import './App.css';
import React, { Component } from 'react';
import AddItems from "./components/AddItems";
import TodoItems from "./components/TodoItems";


class App extends Component {



  state={
    todo: [
     
    ]
  };


  newTodo = ( title,date)=>{
    this.setState({todo: [...this.state.todo, [title,date]] });
  }


  render() {
    console.log(this.state.todo)
    return (
      <div>
        <AddItems newTodo={this.newTodo}/>
        <TodoItems 
        todo = {this.state.todo}/>
      </div>
    );
  }
}

export default App;
