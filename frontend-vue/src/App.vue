<template>
  <main class="[ app-container ] [ wrapper flow ]">
    <header>
      <h1 class="uppercase">Todo</h1>
      <button></button>
    </header>
    <create-new-todo />
    <list-of-todos />
    <aside>
      <p>Drag and drop to reorder list</p>
    </aside>
  </main>
</template>

<script>
import CreateNewTodo from './components/CreateNewTodo.vue';
import ListOfTodos from './components/ListOfTodos.vue';

export default {
  name: 'App',
  components: {
    CreateNewTodo, ListOfTodos,
  },
  mounted() {
    // populate todo list
  },
};
</script>
