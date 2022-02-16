import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: [
      {
        id: 1,
        description: 'Clean and hover flat',
        status: 'todo',
      },
      {
        id: 1,
        description: 'Django tutorial',
        status: 'todo',
      },
      {
        id: 1,
        description: 'Meal prep for next week',
        status: 'done',
      },
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
