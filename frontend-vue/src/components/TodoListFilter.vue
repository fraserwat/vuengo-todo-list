<template>
  <fieldset class="reset-styles faint-text box-flex">
    <input type="radio" @change="updateFilter($event)" class="sr-only"
      name="filter" id="input-all" value="all" :checked="currentFilter === 'all'">
    <input type="radio" @change="updateFilter($event)" class="sr-only"
      name="filter" id="input-todo" value="todo" :checked="currentFilter === 'todo'">
    <input type="radio" @change="updateFilter($event)" class="sr-only"
      name="filter" id="input-done" value="done" :checked="currentFilter === 'done'">
    <label for="input-all" :class="(currentFilter === 'all') ? 'active' : ''">All</label>
    <label for="input-todo" :class="(currentFilter === 'todo') ? 'active' : ''">Active</label>
    <label for="input-done" :class="(currentFilter === 'done') ? 'active' : ''">Completed</label>
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
  #all:checked ~ label:first-of-type,
  #todo:checked ~ label:nth-of-type(2),
  #done:checked ~ label:last-of-type,
  label.active {
    color: #3A7CFD;
    font-weight: 700;
  }
</style>
