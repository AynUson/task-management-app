import http from "./http";

export function fetchTasks() {
  return http.get("/tasks");
}
