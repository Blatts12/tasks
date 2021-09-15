import { Box, CircularProgress, Typography } from "@material-ui/core";
import { Error } from "@material-ui/icons";
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
    <Box
      className={classes.taskList}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {tasks.map((task) => (
        <TaskCard task={task} deleteTask={deleteTask} updateTask={updateTask} />
      ))}
      {loading && <CircularProgress />}
      {error && (
        <>
          <Error color="error" fontSize="large" />
          <Typography variant="h5"> Error happend </Typography>
        </>
      )}
    </Box>
  );
};

export default TaskList;
