import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type IVisitor, type IVisitorAdd } from '@/types/Visitor'
import { Filter } from '@/types/Filters'

export const useVisitorsStore = defineStore('visitors', () => {
  //список посетителей
  const visitors = ref<IVisitor[]>([])

  //количество присутствующих
  //реализовано в виде счетчика, чтобы не пробегать каждый раз по всему массиву
  const presenceCount = ref<number>(0)

  //подстрока для поиска по имени
  const searchName = ref('')

  //активный фильтр
  const activeFilter = ref<Filter | null>(null)

  //инициализация списка посетителей путем загрузки из localStorage
  const init = (): void => {
    visitors.value = localStorage.getItem('visitors')
      ? JSON.parse(localStorage.getItem('visitors') as string)
      : []

    //получение количества присутствующих
    if (visitors.value.length > 0) {
      presenceCount.value = visitors.value.filter((visitor) => visitor.presence).length
    }
  }

  //добавление посетителя
  const addVisitor = (visitor: Required<IVisitorAdd>): void => {
    visitors.value.push({ ...visitor, id: getLastId.value + 1 })

    //запись в localStorage
    localStorage.setItem('visitors', JSON.stringify(visitors.value))

    //при добавлении посетителя с присутствием, количество присутствующих увеличивается
    if (visitor.presence) {
      presenceCount.value += 1
    }
  }

  //обновление посетителя
  const updateVisitor = (visitor: IVisitor): void => {
    const index = visitors.value.findIndex((item) => item.id === visitor.id)

    if (index !== -1) {
      //изменение количества присутствующих
      if (visitors.value[index].presence === true && visitor.presence === false) {
        presenceCount.value -= 1
      } else if (visitors.value[index].presence === false && visitor.presence === true) {
        presenceCount.value += 1
      }

      visitors.value[index] = visitor
      localStorage.setItem('visitors', JSON.stringify(visitors.value))
    }
  }

  //удаление посетителя
  const deleteVisitor = (id: number): void => {
    const index = visitors.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      //изменение количества присутствующих
      if (visitors.value[index].presence) {
        presenceCount.value -= 1
      }

      visitors.value.splice(index, 1)
      localStorage.setItem('visitors', JSON.stringify(visitors.value))
    }
  }

  //получение посетителей с учетом всех фильтров
  const getVisitors = computed<IVisitor[]>(() => {
    return visitors.value.filter((visitor) => {
      if (activeFilter.value === Filter.PRESENCE && !visitor.presence) {
        return false
      } else if (activeFilter.value === Filter.ABSENCE && visitor.presence) {
        return false
      } else if (searchName.value) {
        return visitor.name.toLowerCase().includes(searchName.value.toLowerCase())
      }
      return true
    })
  })

  //получение последнего id
  const getLastId = computed<number>(() => {
    if (visitors.value.length > 0) {
      return visitors.value[visitors.value.length - 1].id
    }
    return 0
  })

  //количество посетителей
  const visitorsCount = computed<number>(() => visitors.value.length)

  return {
    init,
    addVisitor,
    updateVisitor,
    deleteVisitor,
    getVisitors,
    getLastId,
    presenceCount,
    visitorsCount,
    searchName,
    activeFilter
  }
})
