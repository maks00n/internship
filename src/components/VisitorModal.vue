<script setup lang="ts">
import SelectItem from '@/components/SelectItem.vue'
import { useVisitorsStore } from '@/stores/visitors'
import { VisitorGroup, type IVisitorAdd, type IVisitor } from '@/types/Visitor'
import { ref, onMounted, type PropType } from 'vue'

const props = defineProps({
  updatingVisitor: {
    type: Object as PropType<IVisitor>,
    required: false
  }
})

const visitor = ref<Partial<IVisitor>>({
  id: props.updatingVisitor ? props.updatingVisitor.id : undefined,
  name: props.updatingVisitor ? props.updatingVisitor.name : '',
  company: props.updatingVisitor ? props.updatingVisitor.company : '',
  group: props.updatingVisitor ? props.updatingVisitor.group : undefined,
  presence: props.updatingVisitor ? props.updatingVisitor.presence : false
})

const emit = defineEmits(['close'])

const visitorsStore = useVisitorsStore()

const addVisitor = (): void => {
  visitorsStore.addVisitor(visitor.value as Required<IVisitorAdd>)
  emit('close')
}

const updateVisitor = (): void => {
  visitorsStore.updateVisitor(visitor.value as IVisitor)
  emit('close')
}

const deleteVisitor = (): void => {
  if (props.updatingVisitor) {
    visitorsStore.deleteVisitor(props.updatingVisitor.id)
  }
  emit('close')
}

onMounted(() => {
  //при нажатии вне блока modal-content, модальное окно закрывается
  const onClickOutside = (event: Event) => {
    if (event.target && (event.target as HTMLElement).classList.contains('modal')) {
      emit('close')
    }
  }
  document.addEventListener('click', onClickOutside)
})
</script>

<template>
  <teleport to="body">
    <div class="modal">
      <div class="modal-content">
        <form @submit.prevent="props.updatingVisitor ? updateVisitor() : addVisitor()">
          <div class="input-group">
            <label for="name">ФИО</label>
            <input type="text" id="name" v-model="visitor.name" />
          </div>

          <div class="input-group">
            <label for="company">Компания</label>
            <input type="text" id="company" v-model="visitor.company" />
          </div>

          <div class="input-group">
            <label for="group">Группа</label>
            <SelectItem
              class="select-item"
              v-model="visitor.group"
              :values="[VisitorGroup.PASSERBY, VisitorGroup.CLIENT, VisitorGroup.PARTNER]"
            />
          </div>

          <div class="input-group">
            <label for="presence">Присутствие</label>
            <input type="checkbox" id="presence" v-model="visitor.presence" />
          </div>

          <div class="buttons">
            <button
              class="success-btn"
              type="submit"
              :disabled="
                visitor.name === '' || visitor.company === '' || visitor.group === undefined
              "
            >
              {{ props.updatingVisitor ? 'Изменить' : 'Добавить' }}
            </button>
            <button class="delete-btn" @click="deleteVisitor" v-if="props.updatingVisitor">
              Удалить
            </button>
            <button class="cancel-btn" @click="emit('close')">Закрыть</button>
          </div>
        </form>

        <button class="close-btn" @click="emit('close')"><span>+</span></button>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3rem);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;

  .modal-content {
    width: 1461rem;
    height: 581rem;
    background: white;
    border-radius: 20rem;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease-in-out;
    position: relative;

    form {
      display: flex;
      flex-direction: column;
      width: 775rem;
      gap: 40rem;

      .input-group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        label {
          font-size: 32rem;
          font-weight: 600;
          color: rgba(78, 48, 0, 1);
        }

        input,
        .select-item {
          width: 502rem;
        }

        input[type='checkbox'] {
          width: 34rem;
          height: 34rem;
          margin-right: 468rem;
          cursor: pointer;
        }
      }

      .buttons {
        display: flex;
        flex-direction: row;
        gap: 34rem;
      }
    }
    .close-btn {
      position: absolute;
      top: 20rem;
      right: 20rem;
      width: 46rem;
      height: 46rem;
      border-radius: 50%;
      background: $cancel-color;
      border: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background: color.adjust($cancel-color, $lightness: -10%);
      }

      &:active {
        background: color.adjust($cancel-color, $lightness: -20%);
      }

      span {
        color: white;
        font-size: 45rem;
        position: absolute;
        top: 48%;
        left: -3%;
        transform: rotate(45deg) translate(-50%, -50%);
      }
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      scale: 0.5;
    }
    100% {
      opacity: 1;
      scale: 1;
    }
  }
}

@media screen and (orientation: portrait) {
  .modal {
    .modal-content {
      width: 90vw;
      padding: 30rem;
      form {
        width: 100%;

        .input-group {
          label {
            font-size: 20rem;
          }
        }
        .buttons {
          button {
            padding: 8rem 43.5rem;
          }
        }
      }
    }
  }
}
</style>
