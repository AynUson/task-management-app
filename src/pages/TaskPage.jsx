import AddIcon from "@mui/icons-material/Add";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as taskService from "../services/task";
import TasksTable from "../components/TasksTable";

const TaskPage = ({ currentUser }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    // taskService.fetchTasksByUserId(currentUser.sub).then((response) => {
    taskService.fetchTasks().then((response) => {
      setTasks(response.data);
      console.log(response.data);
    });
  }, []);
  const handleMarkAsDone = (id, form) => {
    console.log(form);
    // taskService
    //   .updateTask(id, form)
    //   .then(() => {
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     if (error.response && error.response.status === 400) {
    //       alert(error.response.data.message[0]);
    //     }
    //   });
  };
  return (
    <Grid container spacing={2} justifyContent="flex-end" textAlign="right">
      <Grid item xs={4}>
        <Button
          variant="text"
          startIcon={<AddIcon />}
          LinkComponent={Link}
          to="/tasks/new"
        >
          Add Task
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TasksTable onMarkDone={handleMarkAsDone} tasks={tasks} />
        {/* {tasks.map((task) => (
          <h1>{task.title}</h1>
        ))} */}
      </Grid>
    </Grid>
  );
};

export default TaskPage;
