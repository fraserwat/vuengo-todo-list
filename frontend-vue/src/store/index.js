import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: [
      {
        id: 1,
        order: 1,
        description: 'Clean and hover flat',
        status: 'todo',
      },
      {
        id: 2,
        order: 2,
        description: 'Django tutorial',
        status: 'todo',
      },
      {
        id: 3,
        order: 3,
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
