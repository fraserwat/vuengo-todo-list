<template>
  <form class="[ create-todo ] [ box-flex ]" v-on:submit.prevent="addNewTask">
    <button type="submit"></button>
    <input type="text" placeholder="Create a new todo..." aria-placeholder="Create a new todo">
  </form>
</template>

<script>
export default {
  name: 'CreateNewTodo',
};
</script>
