<script setup lang="ts">
import FooterItem from './components/FooterItem.vue'
import HeaderItem from './components/HeaderItem.vue'

import { useVisitorsStore } from '@/stores/visitors'

const visitorsStore = useVisitorsStore()
visitorsStore.init()
</script>

<template>
  <div class="app">
    <HeaderItem />
    <div class="content">
      <router-view />
    </div>
    <FooterItem />
  </div>
</template>

<style lang="scss" scoped>
.app {
  padding: 24rem 50rem 47rem;
  min-height: 100vh;

  .content {
    margin-top: 34rem;
  }
}

@media screen and (orientation: portrait) {
  .app {
    padding: 24rem 20rem 47rem;
  }
}
</style>
