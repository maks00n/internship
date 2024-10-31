export enum VisitorGroup {
  PASSERBY = 'Прохожий',
  CLIENT = 'Клиент',
  PARTNER = 'Партнер'
}

export interface IVisitorAdd {
  name: string
  company: string
  group?: VisitorGroup
  presence: boolean
}

export interface IVisitor extends Required<IVisitorAdd> {
  id: number
}