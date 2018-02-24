<template>
  <section id="main-section">
    <aside></aside>
    <section id="task-section">
      <vs-input vs-placeholder="New Task" v-model="newTask" class="task-input"/>
      <div>{{ tasks }}</div>
    </section>
  </section>
</template>

<script>
import API from '@/mixins/api'

export default {
  mixins: [ API ],
  data () {
    return {
      newTask: '',
      tasks: []
    }
  },
  async mounted () {
    try {
      const { data } = await this.fetchTasks()
      this.tasks = data
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style>
#task-section {
  max-width: 640px;
  margin: 0 auto;
}

.task-input input[type="text"] {
  font-size: 1em;
}
</style>
