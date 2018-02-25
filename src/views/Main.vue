<template>
  <section id="main-section">
    <transition name="fade">
      <div
        class="task-info-dim"
        v-if="selectedTask"
        @click="selectedTask = null"
      />
    </transition>
    <transition name="slide">
      <aside class="box task-info" v-if="selectedTask">
        {{ selectedTask.body }}
      </aside>
    </transition>
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
              <vs-checkbox
                v-model="task.isCompleted"
                class="task-list-item"
                @click.native="requestToggleCompleted(task)"
              >
                {{task.body}}
              </vs-checkbox>
              <div class="list-item-actions">
                <vs-button
                  vs-type="dark-flat"
                  class="list-item-action"
                  @click="openTaskDetails(task)"
                >
                  i
                </vs-button>
                <vs-button
                  vs-type="danger-flat"
                  class="list-item-action"
                  @click="requestRemove(task)"
                >
                  X
                </vs-button>
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
      tasks: [],
      selectedTask: null
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
        this.$vsNotify({title: 'Task created', text: '추가되었습니다', color: 'primary'})
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
        this.$vsNotify({title: 'Task removed', text: 'Lorem ipsum dolor sit amet, consectetur', color: 'danger'})
      } catch (error) {
        console.error(error)
      }
    },
    async requestToggleCompleted (task) {
      try {
        await this.toggleTaskCompleted(task)
        const text = task.isCompleted ? '완료되었습니다' : '해제되었습니다'
        this.$vsNotify({title: 'Task Updated', text, color: 'success'})
      } catch (error) {
        task.isCompleted = !task.isCompleted
        console.log(error)
      }
    },
    openTaskDetails (task) {
      this.selectedTask = Object.assign({}, task)
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

.list-item-action {
  margin: 2px;
}
.list-item-action .text {
  padding: 6px;
}

/* Task Info */
.task-info {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: calc(100vh - 47px);
  z-index: 9999;
  margin: 17px;
  margin-right: 0;
}

.task-info-dim {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
}

/* Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all .3s ease-out;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  width: 0%;
}
.slide-enter-to, .slide-leave {
  opacity: 1;
  width: 400px;
}

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
