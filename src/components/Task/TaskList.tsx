import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import TaskCard from "./TaskCard";
import useTasks from "./useTasks";

const useStyles = makeStyles({
  taskList: {
    marginTop: 100,
  },
});

const TaskList: React.FC = () => {
  const classes = useStyles();
  const { tasks, createTask, updateTask, deleteTask, loading, error } =
    useTasks();

  return (
    <Box className={classes.taskList} display="flex" flexDirection="column">
      {tasks.map((task) => (
        <TaskCard task={task} deleteTask={deleteTask} updateTask={updateTask} />
      ))}
    </Box>
  );
};

export default TaskList;
