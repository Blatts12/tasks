import React, { useRef, useState } from "react";
import { CircularProgress, IconButton, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { AddCircle, Error, FilterList } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/styles";
import TaskCard from "./TaskCard";
import useTasks from "./useTasks";
import { Virtuoso } from "react-virtuoso";
import Navbar from "../common/Navbar";
import TaskCreateModal from "./TaskCreateModal";

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
  const openFilters = useRef<() => void>(null);
  const openCreate = useRef<() => void>(null);
  const [sortTasks, setSortTasks] = useState(false);
  const { tasks, createTask, updateTask, deleteTask, loading, error } =
    useTasks(sortTasks);

  const handleCreateOpen = () => {
    if (openCreate.current) openCreate.current();
  };

  const handleFiltersOpen = () => {
    if (openFilters.current) openFilters.current();
  };

  const ActionButtons = (
    <>
      <IconButton onClick={handleFiltersOpen}>
        <FilterList />
      </IconButton>
      <IconButton onClick={handleCreateOpen}>
        <AddCircle />
      </IconButton>
    </>
  );

  const ErrorContainer = (
    <>
      {error && (
        <div className={classes.infoContainer}>
          <Error color="error" fontSize="large" />
          <Typography variant="h5">Error happend</Typography>
        </div>
      )}
    </>
  );

  const LoadingContainer = (
    <>
      {loading && (
        <div className={classes.infoContainer}>
          <CircularProgress />
        </div>
      )}
    </>
  );

  return (
    <>
      <Navbar title="Tasks" buttons={ActionButtons} />
      <TaskCreateModal createTask={createTask} openCreateRef={openCreate} />
      <div className={classes.root}>
        {LoadingContainer}
        {ErrorContainer}

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
    </>
  );
};

export default TaskList;
