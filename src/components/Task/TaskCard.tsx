import {
  Box,
  Card,
  CardActions,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Task } from "../../types";

const useStyles = makeStyles({
  card: {
    marginBottom: 10,
  },
  cardHeader: {
    paddingTop: 4,
    paddingBottom: 8,
  },
  cardActions: {
    paddingTop: 0,
    height: 40,
  },
  completeCheckbox: {
    transform: "scale(1.25)",
  },
});

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
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
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
      <CardActions className={classes.cardActions}>
        <Checkbox
          className={classes.completeCheckbox}
          checked={task.done}
          onChange={completeTask}
          inputProps={{ "aria-label": "complete task checkbox" }}
        />
        <Typography variant="h6">
          {task.done ? "Completed" : "To be done"}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
