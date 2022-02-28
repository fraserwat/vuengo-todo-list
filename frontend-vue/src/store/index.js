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
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/tasks/',
        auth: {
          username: 'admin',
          password: '+Ut2bK.#TwwE7!5n',
        },
      }).then((response) => commit('updateTasks', response.data));
    },
    toggleTaskStatus({ state, commit }, taskId) {
      const index = state.tasks.findIndex((x) => x.id === taskId);
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/tasks/${taskId}/`,
        headers: {
          'Content-Type': 'application/json',
        },
        auth: {
          username: 'admin',
          password: '+Ut2bK.#TwwE7!5n',
        },
        data: {
          status: (state.tasks[index].status === 'todo') ? 'done' : 'todo',
          description: state.tasks[index].description,
        },
      }).then((response) => commit('updateTaskStatus', response.data));
    },
    clearCompleted({ state }) {
      this.dispatch('getTasksFromBackend');
      state.tasks.forEach((task) => {
        if (task.status === 'done') {
          console.log(task, `http://127.0.0.1:8000/tasks/${task.id}/`);
          axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/tasks/${task.id}/`,
            headers: {
              'Content-Type': 'application/json',
            },
            auth: {
              username: 'admin',
              password: '+Ut2bK.#TwwE7!5n',
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
          url: 'http://127.0.0.1:8000/tasks/',
          auth: {
            username: 'admin',
            password: '+Ut2bK.#TwwE7!5n',
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
