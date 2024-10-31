<script setup lang="ts">
import FiltersItem from './FiltersItem.vue'
</script>

<template>
  <footer>
    <FiltersItem />
  </footer>
</template>

<style lang="scss" scoped>
footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 25rem 50rem;
  background-color: rgba(255, 255, 255, 0.755);
  backdrop-filter: blur(6rem);
}
</style>
