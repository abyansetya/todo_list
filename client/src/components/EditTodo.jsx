import React, { useState } from "react";

export default function EditTodo({ todo }) {
  const [description, setDescription] = useState(todo.description);
  const [clicked, setClicked] = useState(false);

  //edit description function

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
        onClick={() => setClicked(!clicked)}
      >
        Edit
      </button>

      {/* Modal */}

      {clicked && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-sm"
          id={`id${todo.todo_id}`}
          onClick={() => setDescription(todo.description)}
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-white w-96 mx-auto rounded-lg shadow-xl">
              <div className="relative p-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">Edit Todo</h4>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-600 text-[25px]"
                    data-dismiss="modal"
                    onClick={() => setClicked(false)}
                  >
                    &times;
                  </button>
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2"
                    data-dismiss="modal"
                    onClick={(e) => updateDescription(e)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    data-dismiss="modal"
                    onClick={() => setClicked(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
