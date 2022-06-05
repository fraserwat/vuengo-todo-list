import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: [],
    currentFilter: 'all',
    darkLightState: false,
  },
  mutations: {
    updateTasks: (state, tasks) => {
      state.tasks = tasks;
    },
    updateTaskStatus: (state, data) => {
      const index = state.tasks.findIndex((x) => x.id === data.id);
      state.tasks[index].status = data.status;
    },
    updateFilter: (state, data) => {
      state.currentFilter = data;
    },
    addTask: (state, data) => {
      state.tasks.push(data);
      document.getElementById('input').value = '';
    },
    darkLightToggle: (state, newState) => {
      state.darkLightState = newState;
    },
  },
  actions: {
    toggleDarkLightToggle({ commit, state }) {
      commit('darkLightToggle', !state.darkLightState);
    },
    updateFilter({ commit }, event) {
      commit('updateFilter', event.target.id);
    },
    getTasksFromBackend({ commit }) {
      axios.get('https://vuengo-todo-list-backend.herokuapp.com/api/')
        .then((response) => commit('updateTasks', response.data));
    },
    toggleTaskStatus({ state, commit }, taskId) {
      const index = state.tasks.findIndex((x) => x.id === taskId);
      axios({
        method: 'put',
        url: `${process.env.VUE_APP_API_URL}${taskId}/`,
        headers: {
          'Content-Type': 'application/json',
        },
        auth: {
          username: process.env.VUE_APP_USERNAME,
          password: process.env.VUE_APP_PASSWORD,
        },
        data: {
          status: (state.tasks[index].status === 'todo') ? 'done' : 'todo',
          description: state.tasks[index].description,
        },
      }).then((response) => commit('updateTaskStatus', response.data));
    },
    deleteTask({ state }, taskId) {
      this.dispatch('getTasksFromBackend');
      if (state.tasks.map((x) => x.id).includes(taskId)) {
        axios({
          method: 'delete',
          url: `${process.env.VUE_APP_API_URL}${taskId}/`,
          headers: {
            'Content-Type': 'application/json',
          },
          auth: {
            username: process.env.VUE_APP_USERNAME,
            password: process.env.VUE_APP_PASSWORD,
          },
        }).then(() => {
          this.dispatch('getTasksFromBackend');
        });
      }
    },
    clearCompleted({ state }) {
      this.dispatch('getTasksFromBackend');
      state.tasks.forEach((task) => {
        if (task.status === 'done') {
          axios({
            method: 'delete',
            url: `${process.env.VUE_APP_API_URL}${task.id}/`,
            headers: {
              'Content-Type': 'application/json',
            },
            auth: {
              username: process.env.VUE_APP_USERNAME,
              password: process.env.VUE_APP_PASSWORD,
            },
          }).then(() => {
            this.dispatch('getTasksFromBackend');
          });
        }
      });
    },
    setNewTask({ commit }) {
      const taskName = document.getElementById('input').value;
      if (taskName) {
        axios({
          method: 'post',
          url: process.env.VUE_APP_API_URL,
          auth: {
            username: process.env.VUE_APP_USERNAME,
            password: process.env.VUE_APP_PASSWORD,
          },
          data: {
            description: taskName,
            status: 'todo',
          },
        }).then((response) => {
          const newTask = {
            id: response.data.id,
            description: response.data.description,
            status: response.data.status,
          };
          commit('addTask', newTask);
        });
      }
    },
  },
});
