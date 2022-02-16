<template>
  <ul class="[ todo-list ] [ box-flex ]">
    <li v-for="task in tasks" :key="task" class="box-flex">
      <button :aria-label="(task.status == 'todo') ? 'Complete Task': 'Undo Task Complete'"
      v-on:click.prevent="toggleTaskStatus"
      />
      <p>{{ task.description }}</p>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ListOfTodos',
  props: {
  },
  computed: {
    ...mapState(['tasks']),
  },
};
</script>
