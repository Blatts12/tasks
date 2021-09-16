import React from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { Error } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/styles";
import TaskCard from "./TaskCard";
import useTasks from "./useTasks";
import { Virtuoso } from "react-virtuoso";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 65,
      width: "100%",
      height: "calc(100vh - 65px)",
      overflowY: "hidden",
    },
    infoContainer: {
      marginTop: 120,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

const TaskList: React.FC = () => {
  const classes = useStyles();
  const { tasks, createTask, updateTask, deleteTask, loading, error } =
    useTasks();

  return (
    <div className={classes.root}>
      {loading && (
        <div className={classes.infoContainer}>
          <CircularProgress />{" "}
        </div>
      )}
      {error && (
        <div className={classes.infoContainer}>
          <Error color="error" fontSize="large" />
          <Typography variant="h5">Error happend</Typography>
        </div>
      )}
      <Virtuoso
        totalCount={tasks.length}
        itemContent={(index) => (
          <TaskCard
            task={tasks[index]}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        )}
      />
    </div>
  );
};

export default TaskList;
