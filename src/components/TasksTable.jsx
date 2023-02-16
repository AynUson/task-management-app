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

const TasksTable = ({ tasks, onDeleteTask, currentUser }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    console.log(currentUser);
    if (currentUser.isAdmin === false) {
      taskService.fetchTasks().then((response) => {
        setChecked(response.data);

        setLoading(false);
      });
    } else {
      taskService.fetchAllTasks().then((response) => {
        setChecked(response.data);

        setLoading(false);
      });
    }
  }, []);
  const handleToggle = (task) => () => {
    // Put a spinner or loader
    // const currentIndex = checked.indexOf(value);
    // console.log(checked);
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

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (checked) {
    console.log(checked);
    return (
      <>
        <List>
          {checked ? (
            checked.map((value) => {
              const labelId = `checkbox-list-label-${value.id}`;

              return (
                <ListItem
                  key={value.id}
                  secondaryAction={
                    currentUser.isAdmin === false ? (
                      <div>
                        <Link to={`/tasks/${value.id}/edit`}>
                          <IconButton edge="end" aria-label="comments">
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton
                          onClick={() => onDeleteTask(value.id)}
                          edge="end"
                          aria-label="comments"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ) : (
                      <div></div>
                    )
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={
                      currentUser.isAdmin === false
                        ? handleToggle(value)
                        : () => {}
                    }
                    dense
                  >
                    <ListItemIcon>
                      {currentUser.isAdmin === false ? (
                        <Checkbox
                          edge="start"
                          checked={value.completed}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      ) : (
                        <div></div>
                      )}
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={
                        value.completed ? (
                          <s>⭐{value.title}</s>
                        ) : (
                          `⭐${value.title}`
                        )
                      }
                    />
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
  }
};

export default TasksTable;
