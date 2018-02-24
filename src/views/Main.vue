<template>
  <section id="main-section">
    <aside></aside>
    <section id="task-section">
      <vs-input
        vs-placeholder="New Task"
        v-model.trim="newTask"
        class="task-input"
        @keyup.native.enter="requestCreateTask"
      />
      <div class="box" v-bar>
        <h1 v-if="emptyTasks">There is no tasks</h1>
        <transition-group tag="ul" name="list">
          <li v-for="task in tasks" :key="task.id">
            <div class="task-item-wrapper" :class="{ completed: task.isCompleted }">
              <vs-checkbox v-model="task.isCompleted" class="task-list-item" @click.native="requestToggleCompleted(task)">
                {{task.body}}
              </vs-checkbox>
              <div class="list-item-actions">
                <vs-button vs-type="danger-flat" @click.native="requestRemove(task)">x</vs-button>
              </div>
            </div>
          </li>
        </transition-group>
      </div>
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
  },
  computed: {
    emptyTasks () {
      return this.tasks.length === 0
    }
  },
  methods: {
    async requestCreateTask () {
      if (this.newTask === '') return
      try {
        const { data } = await this.createTask(this.newTask)
        this.tasks.push(data)
      } catch (error) {
        console.error(error)
      } finally {
        this.newTask = ''
      }
    },
    async requestRemove (task) {
      try {
        await this.removeTask(task)
        this.tasks = this.tasks.filter(t => t.id !== task.id)
      } catch (error) {
        console.error(error)
      }
    },
    async requestToggleCompleted (task) {
      try {
        await this.toggleTaskCompleted(task)
      } catch (error) {
        task.isCompleted = !task.isCompleted
        console.log(error)
      }
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

.box {
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 14px 28px rgba(92,116,153,0.15), 0 10px 10px rgba(92,116,153,0.1);
  border-radius: 4px;
  padding: .25rem;
  margin: 10px;
  height: calc(100vh - 100px);
}

.task-item-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-item-wrapper.completed .task-list-item {
  color: #999;
}

.task-list-item {
  margin: 0 !important;
  padding: .5rem;
  justify-content: flex-start !important;
  flex: 1;
}

.list-item-actions {
  margin-right: 10px;
}

/* Transition */
.list-enter-active,
.list-leave-active,
.list-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: relative;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}

/* Scrollbar */
.vb > .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    background-color: rgba(33, 212, 253,.1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(33, 212, 253,.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(33, 212, 253,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(33, 212, 253,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(33, 212, 253,.5);
}
</style>
