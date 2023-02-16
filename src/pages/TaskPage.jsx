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
    });
  }, []);
  const handleDeleteTask = async (id) => {
    const tasksClone = [...tasks];
    try {
      setTasks(tasks.filter((task) => task.id !== id));

      await taskService.deleteTask(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Data might have already been deleted");
      }
      setTasks(tasksClone);
    }
  };
  return (
    <Grid container spacing={2} justifyContent="flex-end" textAlign="right">
      {currentUser.isAdmin === false ? (
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
      ) : (
        <div></div>
      )}
      <Grid item xs={12}>
        <TasksTable
          currentUser={currentUser}
          onDeleteTask={handleDeleteTask}
          tasks={tasks}
        />
        {/* {tasks.map((task) => (
          <h1>{task.title}</h1>
        ))} */}
      </Grid>
    </Grid>
  );
};

export default TaskPage;
