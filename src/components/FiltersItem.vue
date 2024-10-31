<script setup lang="ts">
import { ref, watch } from 'vue'
import { Filter } from '../types/Filters'
import { useVisitorsStore } from '@/stores/visitors'

const activeFilter = ref<Filter | null>(null)

const visitorsStore = useVisitorsStore()
watch(activeFilter, () => {
  visitorsStore.activeFilter = activeFilter.value
})
</script>

<template>
  <div>
    <span>Фильтровать по:</span>
    <ul>
      <li>
        <button
          @click="activeFilter = Filter.ABSENCE"
          :class="{ active: activeFilter === Filter.ABSENCE }"
        >
          Отсутствующим
        </button>
      </li>
      <li>
        <button
          @click="activeFilter = Filter.PRESENCE"
          :class="{ active: activeFilter === Filter.PRESENCE }"
        >
          Присутствующим
        </button>
      </li>
      <li>
        <button @click="activeFilter = null" :class="{ active: activeFilter === null }">
          Без фильтра
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 73rem;

  span {
    font-size: 30rem;
    line-height: 40rem;
    font-family: 'OpenSans-Bold';
  }

  ul {
    display: flex;
    flex-direction: row;
    gap: 52rem;

    li {
      list-style: none;

      button {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 25rem;
        border-radius: 20rem;
        padding: 6rem 20rem;
        transition: background-color 0.2s;

        &:hover {
          background-color: rgb(234, 234, 234);
        }
      }

      button.active {
        background-color: rgba(196, 196, 196, 1);
        color: white;
      }
    }
  }
}

@media screen and (orientation: portrait) {
  div {
    gap: 30rem;
    justify-content: space-between;

    span {
      font-size: 27rem;
    }

    ul {
      gap: 10rem;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
