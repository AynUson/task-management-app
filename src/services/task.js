import http from "./http";

export function fetchTasks() {
  return http.get("/tasks");
}

export function fetchTasksByUserId(userId) {
  return http.get(`/tasks/${userId}`);
}
