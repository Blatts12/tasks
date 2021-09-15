import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { Task } from "../../types";

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
