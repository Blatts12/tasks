import axios from "axios";
import { useEffect, useState } from "react";
import { Task, TaskSort } from "../../types";

const getSortingString = (sortingType: TaskSort) => {
  switch (sortingType) {
    case TaskSort.ID_ASC: {
      return "_sort=id&_order=asc";
    }
    case TaskSort.ID_DESC: {
      return "_sort=id&_order=desc";
    }
    case TaskSort.DONE_ASC: {
      return "_sort=done&_order=asc";
    }
    case TaskSort.DONE_DESC: {
      return "_sort=done&_order=desc";
    }
    default: {
      return "_sort=id&_order=desc";
    }
  }
};

export default function useTasks(
  limit: number = 5,
  sortingType: TaskSort = TaskSort.ID_DESC,
  infinityScroll: boolean = false
) {
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);
  const [needRefetch, setNeedRefetch] = useState(false);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  useEffect(() => {
    setTasks([]);
    setPageNumber(1);
  }, [needRefetch]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchUrl = `http://localhost:3001/tasks?_page=${pageNumber}&_limit=${limit}&${getSortingString(
      sortingType
    )}`;

    axios
      .get(fetchUrl)
      .then((res) => {
        if (infinityScroll) {
          setTasks((prevTasks) =>
            Array.from(new Set([...prevTasks, ...res.data]))
          );
        } else {
          setTasks([...res.data]);
        }
        setHasMore(res.data.length > 0);
        setLoading(false);
        setNeedRefetch(false);
      })
      .catch((e) => {
        setError(true);
      });
  }, [pageNumber, limit, sortingType, infinityScroll, needRefetch]);

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
    pageNumber,
    setPageNumber,
    createTask,
    updateTask,
    deleteTask,
    loading,
    error,
    hasMore,
  };
}
