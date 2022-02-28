<template>
  <main class="[ app-container ] [ flow ]"
    :class="`darkLight-${this.darkLightState === true ? 'toggled' : 'default'}`">
    <header class="[ box-flex space-between wrapper ]">
      <h1 class="uppercase">
        <img src="./assets/logo.svg" alt="Todo" aria-label="Todo">
      </h1>
      <button type="button" class="[ theme-toggle ] [ reset-styles ]" id="colour-toggle"
        @click="this.toggleDarkLightToggle"></button>
    </header>
    <create-new-todo />
    <list-of-todos />
    <todo-list-filter
      class="[ todo-box ] [ todo-padding box-flex drop-shadow wrapper gap-top-600 gap-bottom-900 ]"
      data-device="mobile" />
    <aside class="[ wrapper ] [ faint-text ]">
      <p>Drag and drop to reorder list</p>
    </aside>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CreateNewTodo from './components/CreateNewTodo.vue';
import ListOfTodos from './components/ListOfTodos.vue';
import TodoListFilter from './components/TodoListFilter.vue';

export default {
  name: 'App',
  components: {
    CreateNewTodo, ListOfTodos, TodoListFilter,
  },
  computed: {
    ...mapState(['darkLightState']),
  },
  methods: {
    ...mapActions(['getTasksFromBackend', 'toggleDarkLightToggle']),
  },
  mounted() {
    this.getTasksFromBackend();
  },
};
</script>
