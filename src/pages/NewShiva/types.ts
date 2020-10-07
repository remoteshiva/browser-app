import { Mourner, Visit, Shiva } from '../../store/shiva/types'
import { ToastModel } from '../../components/Toast'

export enum Steps {
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
  videoChatLink: URL | null
}

export interface VisitingProps {
  visits: Visit[]
}

export interface StepProps<T> {
  newShiva: Shiva
  submit: (data: T, nextStep: Steps) => void
  selectStep: (step: number) => void
  addNotification?: (toast: ToastModel) => void
}

export interface VisitingStepProps<T> extends StepProps<T> {
  startDate: Date
  endDate: Date
}
