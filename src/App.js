import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function TodoList() {
  const [task, setTask] = useState("");
  const [isEmpty, setIsEmpty] = useState(false); // State to track if input is empty
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);

  // useEffect hook to remove isEmpty state when the component re-renders
  useEffect(() => {
    // Function to handle clicks outside the input field
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsEmpty(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    // Cleanup function to remove the event listener
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [tasks]); // Runs when tasks state changes

  const handleInputChange = (e) => {
    setTask(e.target.value);
    setIsEmpty(e.target.value.trim() === ""); // Set isempty state based on input value
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { name: task, completed: false }]);
      setTask("");
    } else {
      setIsEmpty(true); // Set isEmpty state to true if input is empty
    }
  };

  const handleDeleteTask = (index, event) => {
    // Stop event propagation to prevent triggering handleTaskClick
    event.stopPropagation();

    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleTaskClick = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <div className="input-container" ref={inputRef}>
        <input className={isEmpty ? "isempty" : ""} type="text" placeholder="Add a new task" value={task} onChange={handleInputChange} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "task-item completed" : "task-item"} onClick={() => handleTaskClick(index)}>
            <span className={`task-name ${task.completed ? "completed" : ""}`}>{task.name}</span>
            <button className="delete-button" onClick={(event) => handleDeleteTask(index, event)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
