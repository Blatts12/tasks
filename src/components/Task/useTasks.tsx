import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "../../types";

export default function useTasks(sortByDone: boolean = false) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [needRefetch, setNeedRefetch] = useState(false);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  useEffect(() => {
    setTasks([]);
  }, [needRefetch]);

  const fetchTasks = (fetchUrl: string) => {
    setLoading(true);
    setError(false);
    axios
      .get(fetchUrl)
      .then((res) => {
        setTasks([...res.data]);
        setLoading(false);
        setNeedRefetch(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    const fetchUrl = `http://localhost:3001/tasks${
      sortByDone ? "?_sort=done,id&_order=desc,desc" : "?_sort=id&_order=desc"
    }`;
    fetchTasks(fetchUrl);
  }, [needRefetch, sortByDone]);

  const createTask = (task: Task) => {
    setError(false);
    const postUrl = "http://localhost:3001/tasks";

    axios
      .post(postUrl, task)
      .then((res) => {
        setNeedRefetch(true);
      })
      .catch((e) => {
        setError(true);
      });
  };

  const consoleEveryDoneTask = () => {
    console.log(tasks.filter((task) => task.done));
  };

  const updateTask = (task: Task) => {
    setError(false);
    const putUrl = `http://localhost:3001/tasks/${task.id}`;

    axios
      .put(putUrl, task)
      .then((res) => {
        const taskIndex = tasks.findIndex((t) => t.id === res.data.id);
        const newTasks = Array.from(tasks);
        newTasks[taskIndex] = { ...res.data };
        setTasks(newTasks);

        consoleEveryDoneTask();
      })
      .catch((e) => {
        setError(true);
      });
  };

  const deleteTask = (id: number) => {
    setError(false);
    const removeUrl = `http://localhost:3001/tasks/${id}`;

    axios
      .delete(removeUrl)
      .then((res) => {
        setTasks([...tasks.filter((t) => t.id !== id)]);
      })
      .catch((e) => {
        setError(true);
      });
  };

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    loading,
    error,
  };
}
