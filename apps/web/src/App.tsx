import "./App.css";
import { useEffect, useState } from "react";
import { Schema } from "@repo/backend/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  return (
    <>
      <button onClick={createTodo} style={{ color: "white" }}>
        + todo 추가하기
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ color: "white" }}>
            {todo.content}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
