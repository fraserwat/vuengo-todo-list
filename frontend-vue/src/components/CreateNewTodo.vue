<template>
  <form class="[ todo-box ] [ todo-padding box-flex drop-shadow wrapper ]"
    v-on:submit.prevent="setNewTask">
    <button type="submit" class="[ todo-checkbox ] [ reset-styles ]"></button>
    <input id="input" type="text" class="reset-styles"
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
