import React, { useState } from "react";

export default function InputTodo() {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center p-6">
      <h1 className="font-bold text-xl">PERN TODO LIST</h1>
      <form className="flex gap-[10px] mt-[20px]" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="border-2 p-2 border-black rounded w-[500px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="border-none p-2 w-[70px] rounded  bg-green-500 hover:bg-green-600 text-white">
          add
        </button>
      </form>
    </div>
  );
}
