<template>
  <fieldset class="reset-styles faint-text box-flex">
    <input type="radio" @change="updateFilter($event)" class="sr-only"
      name="filter" id="all" value="all" :checked="currentFilter === 'all'">
    <input type="radio" @change="updateFilter($event)" class="sr-only"
      name="filter" id="todo" value="todo" :checked="currentFilter === 'todo'">
    <input type="radio" @change="updateFilter($event)" class="sr-only"
      name="filter" id="done" value="done" :checked="currentFilter === 'done'">
    <label for="all">All</label>
    <label for="todo">Active</label>
    <label for="done">Completed</label>
  </fieldset>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ListOfTodos',
  props: {
  },
  computed: {
    ...mapState(['currentFilter']),
  },
  methods: {
    ...mapActions(['updateFilter']),
  },
};
</script>

<style scoped>
  label:nth-of-type(1) {
    margin-left: auto;
  }
  label:nth-of-type(3) {
    margin-right: auto;
  }

</style>
