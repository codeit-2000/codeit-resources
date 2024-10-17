// import { Authenticator } from "@aws-amplify/ui-react";
// import { useEffect, useState } from "react";
// import { Schema } from "@repo/backend/amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
// import { useAuthenticator } from "@aws-amplify/ui-react";

// const client = generateClient<Schema>();

// function AmplifyTest() {
//   const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
//   const { signOut, user } = useAuthenticator();

//   function createTodo() {
//     client.models.Todo.create({ content: window.prompt("Todo content") });
//   }

//   function deleteTodo(id: string) {
//     client.models.Todo.delete({ id });
//   }

//   useEffect(() => {
//     client.models.Todo.observeQuery().subscribe({
//       next: (data) => setTodos([...data.items]),
//     });
//   }, []);

//   return (
//     <>
//       {user.username}
//       <button onClick={createTodo} style={{ color: "white" }}>
//         + todo 추가하기
//       </button>
//       <ul>
//         {todos.map((todo) => (
//           <li
//             key={todo.id}
//             onClick={() => deleteTodo(todo.id)}
//             style={{ color: "white" }}
//           >
//             {todo.content}
//           </li>
//         ))}
//       </ul>
//       <button onClick={signOut}>Sign out</button>
//     </>
//   );
// }

// export default function AmplifyWrapper() {
//   return (
//     <Authenticator>
//       <AmplifyTest />
//     </Authenticator>
//   );
// }
