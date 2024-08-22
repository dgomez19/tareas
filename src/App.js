import { TodoCounter } from './TodoCounter'
import { TodoSearch } from './TodoSearch'
import { TodoList } from './TodoList'
import { TodoItem } from './TodoItem'
import { CreateTodoButton } from './CreateTodoButton'

import React from 'react'

const defaultTodos = [
  { text: 'Estudiar React.js', completed: false },
  { text: 'Implementar React.js', completed: true },
  { text: 'Seguir estudiante React.js', completed: false },
  { text: 'Aprender una nueva tecnologia', completed: false }
]

function App() {
  const [searchValue, setSearchValue] = React.useState('')

  const [todos, setTodos] = React.useState(defaultTodos)

  const totalTodosCompleted = todos.filter(
    todo => !!todo.completed
  ).length;

  const totalTodos = todos.length

  const searchTodos = todos.filter(
    (todo) => {
      return todo.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    }
  );

  const competeTodo = (text) => {
    const newTodo = [...todos]

    const todoIndex = newTodo.findIndex(
      (todo) => text === todo.text
    )

    newTodo[todoIndex].completed = true
    setTodos(newTodo)
  }

  const deleteTodo = (text) => {
    const newTodo = [...todos]

    const todoIndex = newTodo.findIndex(
      (todo) => text === todo.text
    )

    newTodo.splice(todoIndex, 1)
    setTodos(newTodo)
  }

  return (
    <>
      <TodoCounter completed={totalTodosCompleted} total={totalTodos} />

      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {searchTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onCompleted={ () => competeTodo(todo.text) }
            onDelete={ () => deleteTodo(todo.text) }
          />
        ))}
      </TodoList>
      
      <CreateTodoButton />
    </>
  );
}

export default App;
