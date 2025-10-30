import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export function Home() {
  const [todo, settodo] = useState("");
  const [todoList, setToDoList] = useState([]);

  const AddTask = async () => {
    if (!todo.trim()) return;
    try {
      const result = await axios.post("http://localhost:3000/add", { todo });
      setToDoList((prev) => [...prev, { todo }]);
      settodo(""); // clear input
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/display")
      .then((result) => setToDoList(result.data))
      .catch((err) => console.error(err));
  }, []);

  const Delete=(id)=>{

         axios
      .delete(`http://localhost:3000/delete/${id}`)
     .then((result) => {
      console.log("Deleted:", id);
      setToDoList(result.data);
    })
      .catch((err) => console.error(err));
     
  }

  return (
    <div className="main_div">
      <h1>To-Do App</h1>

      <div className="input_div">
        <input
          type="text"
          placeholder="Add Your Task"
          value={todo}
          onChange={(e) => settodo(e.target.value)}
        />
        <button onClick={AddTask}>
          <FontAwesomeIcon icon={faPlus} /> Add
        </button>
      </div>

      <div className="result">
        {todoList.map((t, index) => (
          <div key={index} className="todo-item">
            <span className="todo-text">{t.todo}</span>
            <button className="delete-btn" onClick={()=>Delete(t._id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
