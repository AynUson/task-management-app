import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import * as taskService from "../services/task";

import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import CommentIcon from "@mui/icons-material/Comment";

const TasksTable = ({ tasks, onMarkDone }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(tasks);
  useEffect(() => {
    taskService.fetchTasks().then((response) => {
      setChecked(response.data);
    });
  }, []);
  const handleToggle = (task) => () => {
    // Put a spinner or loader
    // const currentIndex = checked.indexOf(value);
    console.log(checked);
    setChecked(
      checked.map((t) => {
        if (t.id === task.id) {
          const tempTask = {
            ...task,
            completed: !task.completed,
          };
          taskService
            .updateTask(task.id, tempTask)
            .then(() => {
              navigate("/");
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                alert(error.response.data.message[0]);
              }
            });
        }
      })
    );
    // console.log(checked);
    // if (currentIndex === -1) {
    //   onMarkDone(task);
    //   newChecked.push(value);
    // } else {
    //   onMarkDone(task);
    //   newChecked.splice(currentIndex, 1);
    // }
  };
  return (
    <>
      <List>
        {tasks ? (
          tasks.map((value) => {
            const labelId = `checkbox-list-label-${value.id}`;

            return (
              <ListItem
                key={value.id}
                secondaryAction={
                  <div>
                    <IconButton edge="end" aria-label="comments">
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="comments">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value.completed}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value.title}`} />
                </ListItemButton>
              </ListItem>
            );
          })
        ) : (
          <h1>You don't have a tasks...</h1>
        )}
      </List>
    </>
  );
};

export default TasksTable;
