<script setup lang="ts">
import { ref } from 'vue'
import VisitorModal from './VisitorModal.vue'
import { useVisitorsStore } from '@/stores/visitors'
import type { IVisitor } from '@/types/Visitor'

const modalVisible = ref(false)

const updatingVisitor = ref<IVisitor | null>(null)

const toggleVisible = (visitor: IVisitor): void => {
  updatingVisitor.value = modalVisible.value ? null : visitor
  modalVisible.value = !modalVisible.value
}

const visitorsStore = useVisitorsStore()
</script>

<template>
  <div class="table">
    <div class="table-wrapper">
      <div class="head">
        <div class="number">Номер</div>
        <div class="name">ФИО</div>
        <div class="company">Компания</div>
        <div class="group">Группа</div>
        <div class="presence">Присутствие</div>
      </div>
      <div
        class="visitors"
        v-auto-animate="{ duration: 100 }"
        v-if="visitorsStore.getVisitors.length"
      >
        <div
          class="visitor"
          v-for="visitor in visitorsStore.getVisitors"
          :key="visitor.id"
          @click="toggleVisible(visitor)"
        >
          <div class="number">{{ visitor.id }}</div>
          <div class="name">{{ visitor.name }}</div>
          <div class="company">{{ visitor.company }}</div>
          <div class="group">{{ visitor.group }}</div>
          <div class="presence">
            <div :class="'circle ' + (visitor.presence ? 'circle-green' : 'circle-red')" />
          </div>
        </div>
      </div>
      <div class="visitors" v-else>
        <span class="not-found">Ничего не найдено</span>
      </div>
    </div>
    <VisitorModal
      v-if="modalVisible && updatingVisitor"
      @close="toggleVisible"
      :updating-visitor="updatingVisitor"
    />
  </div>
</template>

<style lang="scss" scoped>
.number {
  width: 11.2%;
}
.name {
  width: 26.3%;
}
.company {
  width: 21.5%;
}
.group {
  width: 33%;
}
.presence {
  width: 8%;
}
.head {
  display: flex;
  font-size: 20rem;
  font-weight: 600;
  padding: 0 15rem 7rem;
  margin-bottom: 10rem;
  border-bottom: 3rem solid rgba(233, 233, 233, 1);
  color: rgba(78, 48, 0, 1);
}
.visitors {
  margin-bottom: 47rem;
  .not-found {
    display: block;
    font-family: 'OpenSans-Bold';
    width: 400rem;
    text-align: center;
    margin: 30rem auto;
    font-size: 35rem;
    color: rgb(119, 119, 119);
  }
  .visitor {
    display: flex;
    align-items: center;
    font-size: 30rem;
    font-weight: 400;
    padding: 15rem;
    cursor: pointer;
    border-radius: 10rem;
    transition: background-color 0.1s;

    &:hover {
      background-color: rgba(233, 233, 233, 1);
    }

    > div {
      padding-right: 10rem;
    }

    .name,
    .company,
    .group {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .presence {
      .circle {
        width: 59rem;
        height: 59rem;
        border-radius: 50%;
      }

      .circle-green {
        background: $primary-color;
      }
      .circle-red {
        background: $secondary-color;
      }
    }
  }
}

@media screen and (orientation: portrait) {
  .table {
    overflow-x: scroll;

    .table-wrapper {
      width: 200%;
    }
  }
}
</style>
