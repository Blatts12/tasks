import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { createStyles, makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { Task } from "../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      padding: 16,
    },
    taskForm: {
      display: "flex",
      flexDirection: "column",
    },
    titleInput: {
      marginTop: 10,
      width: 400,
      [theme.breakpoints.down("sm")]: {
        width: 275,
      },
    },
    submitButton: {
      marginTop: 20,
    },
  })
);

interface Props {
  createTask: (task: Task) => void;
  openCreateRef: React.MutableRefObject<(() => void) | null>;
}

const TaskCreateModal: React.FC<Props> = ({ createTask, openCreateRef }) => {
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const classes = useStyles();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  openCreateRef.current = handleOpen;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const title = taskTitle.trim();
    if (title === "") {
      setTitleError(true);
      return;
    }

    const task = {
      id: 0,
      title,
      done: false,
    };
    createTask(task);
    setTitleError(false);
    setTaskTitle("");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} className={classes.root}>
      <Paper elevation={4} className={classes.paper}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className={classes.taskForm}
        >
          <Typography variant="h6">Create Task</Typography>
          <TextField
            required
            variant="outlined"
            label="Title"
            onChange={handleTitleChange}
            value={taskTitle}
            error={titleError}
            className={classes.titleInput}
          />
          <Button
            variant="contained"
            type="submit"
            className={classes.submitButton}
          >
            Add
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default TaskCreateModal;
