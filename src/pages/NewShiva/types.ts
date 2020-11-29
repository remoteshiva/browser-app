import { Mourner, Visit, Shiva } from '../../store/shiva/types'

export enum Steps {
  UNKNOWN = 0,
  BASIC_DETAILS = 1,
  VIDEO_CHAT_LINK,
  MOURNERS,
  VISITS,
  DONE,
}
export interface BasicDetailsProps {
  nameOfDeceased: string
  startDate: Date
  endDate: Date
  message?: string
}

export interface MournersProps {
  mourners: Mourner[]
  mournerKey: string
}

export interface ChatProps {
  videoLink: URL | null
}

export interface VisitingProps {
  visits: { [key: string]: Visit }
  minyanTimes?: string
}

export interface StepProps<T> {
  newShiva: Shiva
  submit: (data: T, nextStep: Steps) => void
  selectStep: (step: number) => void
}
