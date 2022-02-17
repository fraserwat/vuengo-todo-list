<template>
  <section class="[ todo-list ] [ box-flex ]">
  <div class="drop-zone" @dragover="dropZoneDragOver($event)">
      <div v-for="task in tasks" :key="task" style="margin:1rem"
        class="[ todo ] [ box-flex draggable ]"
        draggable="true"
        :id="task.description"
        @dragstart="startDrag($event)"
        @dragend="stopDrag($event)"
      >
        <button :aria-label="(task.status == 'todo') ? 'Complete Task': 'Undo Task Complete'"
          v-on:click.prevent="toggleTaskStatus"
        />
        <p>{{ task.description }}</p>
      </div>
  </div>
    <ul class="options">
      <li>{{tasks.filter(x => x.status == 'todo').length}} items left</li>
      <li>
        <fieldset class="reset-styles">
          <input type="radio" name="filter" id="all" value="all" checked>
          <input type="radio" name="filter" id="active" value="active">
          <input type="radio" name="filter" id="completed" value="completed">
          <label for="all">All</label>
          <label for="active">Active</label>
          <label for="completed">Completed</label>
        </fieldset>
      </li>
      <li>
        <button class="reset-styles">
          Clear Completed
        </button>
      </li>
    </ul>
  </section>
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
  methods: {
    /* eslint-disable no-param-reassign */
    startDrag(event) {
      // TODO: need to change opacity and add mid-drag styles here
      event.target.classList.add('dragging');
    },
    stopDrag(event) {
      event.target.classList.remove('dragging');
    },
    dropZoneDragOver(event) {
      event.preventDefault();
      const draggable = document.querySelector('.dragging');
      const dragZone = document.querySelector('.drop-zone');
      const afterElement = this.getDragAfterElement(event);

      if (!afterElement) {
        dragZone.appendChild(draggable);
      } else {
        dragZone.insertBefore(draggable, afterElement);
      }
    },
    getDragAfterElement(event) {
      const draggableElements = [...document.querySelectorAll('.draggable:not(.dragging)')];
      // const container = document.querySelector('.drop-zone');
      const y = event.clientY;

      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }
        return closest;
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    },
    /* eslint-enable no-param-reassign */
  },
  // setup() {
  //   const startDrag = (event, item) => {
  //     console.log(item);
  //     event.dataTransfer.dropEffect = 'move';
  //     event.dataTransfer.effectAllowed = 'move';
  //     event.dataTransfer.setData('itemID', item.id);
  //   };
  // },
};
</script>
