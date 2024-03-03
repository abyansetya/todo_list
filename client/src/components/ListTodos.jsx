import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

export default function ListTodos() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  //delete todo
  async function deleteTodo(id) {
    const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.todo_id !== id));
  }

  console.log(todos);
  return (
    <div className="w-full flex justify-center items-center">
      {" "}
      {/* Center align both horizontally and vertically */}
      <table className="table border-2 text-center  w-[700px] justify-between ">
        <thead className="">
          <tr className="m-[20px] h-[50px] border-b-2">
            <th style={{ width: "33%" }}>Description</th>
            <th style={{ width: "33%" }}>Edit</th>
            <th style={{ width: "33%" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id} className="mb-[20px] border-b-2">
              <td className="h-[50px]">{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  onClick={() => deleteTodo(todo.todo_id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
