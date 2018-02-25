import axios from 'axios'
import config from '../config'

const http = axios.create({
  baseURL: config.API_ENDPOINT,
  timeout: 1000
})

const fetchTasks = () => {
  return http.get('tasks')
}

const createTask = (body) => {
  return http.post('tasks', { body })
}

const removeTask = ({ id }) => {
  return http.delete(`task/${id}`)
}

const toggleTaskCompleted = ({ id, isCompleted, body }) => {
  return http.patch(`task/${id}`, { isCompleted, body })
}
export default {
  methods: {
    fetchTasks,
    createTask,
    removeTask,
    toggleTaskCompleted
  }
}
