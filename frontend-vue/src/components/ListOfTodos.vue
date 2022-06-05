<template>
  <section class="[ todo-box ] [ box-flex flex-col wrapper drop-shadow ]">
  <div class="drop-zone" @dragover="dropZoneDragOver($event)">
      <div v-for="task in filteredList" :key="task"
        class="[ todo ] [ todo-padding box-flex draggable ]"
        draggable="true"
        :id="str(task.description).replace(' ', '-')"
        @dragstart="startDrag($event)"
        @dragend="stopDrag($event)"
      >
        <button :aria-label="(task.status == 'todo') ? 'Complete Task': 'Undo Task Complete'"
          :class="`[ todo-checkbox ] [ reset-styles ${(task.status == 'todo') ? '' : 'checked'} ]`"
          v-on:click.prevent="toggleTaskStatus(task.id)"
        />
        <p :class="(task.status == 'done') ? 'strikethrough' : ''">{{ task.description }}</p>
        <button class="[ cross ] [ reset-styles ]" @click="deleteTask(task.id)"
          aria-label="Delete Task">
          <img src="../assets/icon-cross.svg" alt="">
        </button>
      </div>
  </div>
    <ul class="[ options ] [ box-flex width-full space-between faint-text ]">
      <li>{{tasks.filter(x => x.status == 'todo').length}} items left</li>
      <li data-device="desktop"><todo-list-filter /></li>
      <li>
        <button class="reset-styles" @click="clearCompleted">
          Clear Completed
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TodoListFilter from './TodoListFilter.vue';

export default {
  components: { TodoListFilter },
  name: 'ListOfTodos',
  props: {
  },
  computed: {
    ...mapState(['tasks', 'currentFilter']),
    filteredList() {
      if (this.currentFilter !== 'all') {
        return this.tasks.filter((t) => t.status === this.currentFilter);
      }
      return this.tasks;
    },
  },
  methods: {
    ...mapActions(['toggleTaskStatus', 'clearCompleted', 'updateFilter', 'deleteTask']),

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
};
</script>
