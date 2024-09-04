import React from 'react'
import './App.css';
import Todos from './components/Todos';
import Todo from './models/todo';
import NewTodo from './components/NewTodo';
function App() {
  const todos =[
    new Todo('리액트배우기'),
    new Todo('타스배우기')
  ];

  return (
    <div >
     <Todos items={todos}/>
     <NewTodo/>
    </div>
  );
}

export default App;
