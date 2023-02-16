import React from "react";
import { useNavigate } from "react-router-dom";
import TasksForm from "../components/TasksForm";
import * as taskService from "../services/task";

const AddTaskPage = ({ currentUserId }) => {
  const navigate = useNavigate();
  const handleSubmit = (task) => {
    taskService
      .addTask(task)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message[0]);
        }
      });
    // employeeService
    //   .addEmployee(employee)
    //   .then((response) => {
    //     console.log(response);
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     if (error.response && error.response.status === 400) {
    //       alert(error.response.data.message[0]);
    //     }
    //   });
  };

  return (
    <div>
      <TasksForm currentUserId={currentUserId} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddTaskPage;
