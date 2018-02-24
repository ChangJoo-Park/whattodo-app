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
export default {
  methods: {
    fetchTasks,
    createTask
  }
}
