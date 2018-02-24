import axios from 'axios'

const http = axios.create({
  timeout: 1000
})

const fetchTasks = () => {
  return http.get('api/tasks')
}

const createTask = (body) => {
  return http.post('api/tasks', { body })
}

const removeTask = ({ id }) => {
  return http.delete(`api/task/${id}`)
}

const toggleTaskCompleted = ({ id, isCompleted, body }) => {
  return http.patch(`api/task/${id}`, { isCompleted, body })
}
export default {
  methods: {
    fetchTasks,
    createTask,
    removeTask,
    toggleTaskCompleted
  }
}
