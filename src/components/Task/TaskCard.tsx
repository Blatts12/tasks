import {
  Card,
  CardActions,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { Delete } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { Task } from "../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "auto",
      marginTop: 10,
      marginBottom: 5,
      width: "50%",
      [theme.breakpoints.down("lg")]: {
        width: "60%",
      },
      [theme.breakpoints.down("md")]: {
        width: "70%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
    },
    header: {
      padding: "4px 0 0 8px",
    },
    actions: {
      padding: 0,
      height: 40,
      display: "flex",
      justifyContent: "space-between",
    },
    completeCheckbox: {
      transform: "scale(1.25)",
    },
    completeText: {
      paddingRight: 8,
    },
  })
);

interface Props {
  task: Task;
  deleteTask: (id: number) => void;
  updateTask: (task: Task) => void;
}

const TaskCard: React.FC<Props> = ({ task, deleteTask, updateTask }) => {
  const classes = useStyles();

  const completeTask = () => {
    const updatedTask = {
      ...task,
      done: !task.done,
    };
    updateTask(updatedTask);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        title={task.title}
        action={
          <IconButton
            aria-label="delete task button"
            onClick={() => deleteTask(task.id)}
          >
            <Delete fontSize="medium" color="error" />
          </IconButton>
        }
      />
      <CardActions className={classes.actions}>
        <Checkbox
          className={classes.completeCheckbox}
          checked={task.done}
          onChange={completeTask}
          inputProps={{ "aria-label": "complete task checkbox" }}
        />
        <Typography
          className={classes.completeText}
          variant="h6"
          color={task.done ? "secondary" : "textPrimary"}
        >
          {task.done ? "Completed" : "To be done"}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
