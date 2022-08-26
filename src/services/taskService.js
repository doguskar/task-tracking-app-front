import axios from "axios"

export default class ProductService {
    get(e) {
        return axios.get(`http://localhost:8080/api/v1/projects/${e.projectId}/task-lists/${e.taskListId}/tasks/${e.taskId}`)
    }
    post(task) {
        return axios.post(`http://localhost:8080/api/v1/projects/${task.projectId}/task-lists/${task.taskListId}/tasks`, task)
    }
    patch(e) {
        return axios.patch(`http://localhost:8080/api/v1/projects/${e.projectId}/task-lists/${e.taskListId}/tasks/${e.task.id}`, e.task)
    }
    delete(e) {
        return axios.delete(`http://localhost:8080/api/v1/projects/${e.projectId}/task-lists/${e.taskListId}/tasks/${e.task.id}`)
    }
}