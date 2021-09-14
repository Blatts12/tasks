import React, { useState } from "react";
import { TaskSort } from "../types";
import useTasks from "./Task/useTasks";

function App() {
  const {
    tasks,
    pageNumber,
    setPageNumber,
    createTask,
    updateTask,
    deleteTask,
    loading,
    error,
    hasMore,
  } = useTasks(2, TaskSort.ID_DESC, true);

  const [taskTitle, setTaskTitle] = useState("");

  const addPage = () => {
    if (hasMore) setPageNumber(pageNumber + 1);
  };

  const onTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const submitTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task = {
      id: 0,
      title: taskTitle,
      done: false,
    };

    createTask(task);
  };

  return (
    <div>
      <form onSubmit={submitTask}>
        <input type="text" name="taskTitle" onChange={onTaskTitle} />
        <input type="submit" value="Add Task" />
      </form>
      <button onClick={addPage}>{`Page ${pageNumber}`}</button>
      {tasks.map((task) => (
        <div key={task.id} style={{ width: "100%" }}>
          {task.title}{" "}
          <button onClick={() => deleteTask(task.id)}>DELETE</button>
          <button onClick={() => updateTask({ ...task, done: !task.done })}>
            {task.done ? "UNDONE" : "DONE"}
          </button>
        </div>
      ))}
      {loading && <span>Loading</span>}
      {error && <span>Error</span>}
    </div>
  );
}

export default App;
