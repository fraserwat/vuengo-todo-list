<template>
  <main class="[ app-container ] [ wrapper flow ]"
    :class="`darkLight-${this.darkLightState === true ? 'toggled' : 'default'}`">
    <header>
      <h1 class="uppercase">Todo</h1>
      <button type="button" id="colour-toggle" @click="this.toggleDarkLightToggle"></button>
    </header>
    <create-new-todo />
    <list-of-todos />
    <aside>
      <p>Drag and drop to reorder list</p>
    </aside>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CreateNewTodo from './components/CreateNewTodo.vue';
import ListOfTodos from './components/ListOfTodos.vue';

export default {
  name: 'App',
  components: {
    CreateNewTodo, ListOfTodos,
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
