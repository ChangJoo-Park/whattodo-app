import axios from 'axios'

const http = axios.create({
  timeout: 1000
})

const fetchTasks = () => {
  return http.get('api/tasks')
}

export default {
  methods: {
    fetchTasks
  }
}
