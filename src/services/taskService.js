import axios from "axios"

const baseUrl = "https://task-tracking-application.herokuapp.com"

export default class ProductService {
    get(e) {
        return axios.get(`${baseUrl}/api/v1/projects/${e.projectId}/task-lists/${e.taskListId}/tasks/${e.taskId}`)
    }
    post(task) {
        return axios.post(`${baseUrl}/api/v1/projects/${task.projectId}/task-lists/${task.taskListId}/tasks`, task)
    }
    patch(e) {
        return axios.patch(`${baseUrl}/api/v1/projects/${e.projectId}/task-lists/${e.taskListId}/tasks/${e.task.id}`, e.task)
    }
    delete(e) {
        return axios.delete(`${baseUrl}/api/v1/projects/${e.projectId}/task-lists/${e.taskListId}/tasks/${e.task.id}`)
    }
}