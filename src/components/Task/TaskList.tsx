import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import useTasks from "./useTasks";

const useStyle = makeStyles({
  taskList: {
    marginTop: 100,
  },
});

const TaskList: React.FC = () => {
  const classes = useStyle();
  const { tasks, createTask, updateTask, deleteTask, loading, error } =
    useTasks();

  return (
    <Box
      className={classes.taskList}
      display="flex"
      flexDirection="column"
    ></Box>
  );
};

export default TaskList;
