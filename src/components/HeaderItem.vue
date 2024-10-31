<script setup lang="ts">
import { ref } from 'vue'
import VisitorModal from './VisitorModal.vue'
import { useVisitorsStore } from '@/stores/visitors'

const modalVisible = ref(false)
const toggleVisible: () => void = () => (modalVisible.value = !modalVisible.value)

const visitorsStore = useVisitorsStore()
</script>

<template>
  <header>
    <img src="@/assets/images/logo.jpg" alt="logo" />
    <input
      type="text"
      placeholder="Поиск по имени"
      class="search"
      v-model="visitorsStore.searchName"
    />
    <button class="success-btn" @click="toggleVisible" @close="toggleVisible">Добавить</button>
    <p>
      Посетители <br /><span class="yes">{{ visitorsStore.presenceCount }}</span> /
      <span class="no">{{ visitorsStore.visitorsCount - visitorsStore.presenceCount }}</span>
    </p>
    <VisitorModal v-if="modalVisible" @close="toggleVisible" />
  </header>
</template>

<style lang="scss" scoped>
header {
  height: 89.4rem;
  display: flex;
  align-items: end;

  img {
    width: 187.89rem;
    height: 100%;
    object-fit: cover;
  }

  .search {
    width: 394rem;
    height: 52rem;
    margin-left: 32.11rem;
  }

  button {
    margin-left: 40rem;
  }

  p {
    font-family: 'OpenSans-Bold';
    font-size: 30rem;
    text-align: right;
    margin-left: auto;

    .yes {
      font-family: 'OpenSans-Bold';
      color: $primary-color;
    }
    .no {
      font-family: 'OpenSans-Bold';
      color: $secondary-color;
    }
  }
}

@media screen and (orientation: portrait) {
  header {
    align-items: center;
    img {
      width: 140rem;
      height: 70%;
    }
    .search {
      width: 270rem;
      margin-left: 20rem;
    }

    button {
      margin-left: 20rem;
      padding: 10rem 20rem;
      font-size: 20rem;
    }

    p {
      font-size: 20rem;
    }
  }
}
</style>
