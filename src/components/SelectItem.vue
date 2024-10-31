<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue'

const props = defineProps({
  values: {
    type: Array as PropType<string[]>
  },
  modelValue: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const select = (value: string) => {
  emit('update:modelValue', value)
  toggleDropdown()
}

const dropdownVisible = ref(false)
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}
onMounted(() => {
  //при нажатии вне блока Dropdown, окно закрывается
  const onClickOutside = (event: Event) => {
    const target = event.target as HTMLElement
    if (!target.closest('.select-item')) {
      if (dropdownVisible.value) {
        toggleDropdown()
      }
    }
  }
  document.addEventListener('click', onClickOutside)
})
</script>

<template>
  <div class="select-item">
    <div class="select" @click="toggleDropdown">{{ modelValue ? modelValue : 'Выбрать' }}</div>
    <div class="dropdown" v-if="dropdownVisible">
      <div v-for="item in props.values" class="dropdown-item" :key="item" @click="select(item)">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select-item {
  position: relative;

  .select {
    position: relative;
    cursor: pointer;
  }
  .select::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 20rem;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 7rem solid transparent;
    border-right: 7rem solid transparent;
    border-top: 7rem solid black;
  }
  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border: none;
    padding: 5px;
    z-index: 1;
    width: 100%;
    box-shadow: 0 1.5rem 1.5rem 1.5rem rgba(0, 0, 0, 0.086);
    cursor: pointer;

    .dropdown-item {
      width: 100%;
      padding: 8rem;
      font-size: 20rem;
      border-radius: 5rem;

      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
