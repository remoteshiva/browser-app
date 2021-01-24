import { startOfDay, addDays } from 'date-fns'
import { Shiva, Visit } from './types'

const generateRandomKey = (): string => {
  return Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
}

/**
 * @description Initializes a new Shiva object with default params.
 * @param shiva - Optional partial shiva model for overriding defaults
 * @example - const shiva = initializeShiva({nameOfDeceased: 'John Doe'})
 */
export const initializeShiva = (newShiva?: Partial<Shiva>): Shiva => ({
  id: '',
  nameOfDeceased: '',
  startDate: startOfDay(new Date()),
  endDate: startOfDay(addDays(new Date(), 7)),
  message: '',
  mourners: [],
  videoLink: null,
  mournerKey: generateRandomKey(),
  visitorKey: generateRandomKey(),
  visits: {},
  titleImage: null,
  about: '',
  images: [],
  mealSignups: '',
  minyanTimes: '',
  donations: '',
  inviteMessage: '',
  ...newShiva,
})

export const initializeVisit = (visit?: Partial<Visit>): Visit => {
  return {
    id: generateRandomKey(),
    startTime: visit && visit.startTime ? visit.startTime : new Date(),
    endTime: visit && visit.endTime ? visit.endTime : new Date(),
    missingMourners: [],
    visitors: [],
    ...visit,
  }
}
