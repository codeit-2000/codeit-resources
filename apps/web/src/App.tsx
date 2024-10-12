import "./App.css";
import { useEffect, useState } from "react";
import { Schema } from "@repo/backend/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function createTodo() {
    client.models.Todo.create(
      { content: window.prompt("Todo content") },
      {
        authMode: "apiKey",
      },
    );
  }

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  return (
    <Authenticator>
      <button onClick={createTodo} style={{ color: "red" }}>
        + asdfasdf
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </Authenticator>
  );
}

export default App;
