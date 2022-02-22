<template>
  <form class="[ create-todo ] [ box-flex drop-shadow ]" v-on:submit.prevent="setNewTask">
    <button type="submit"></button>
    <input id="input" type="text"
      placeholder="Create a new todo..." aria-placeholder="Create a new todo" >
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CreateNewTodo',
  methods: {
    ...mapActions(['setNewTask']),
  },
};
</script>
