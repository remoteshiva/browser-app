import moment from 'moment'
import { Mourner, Visit, Shiva } from '../../store/shiva/types'

export enum Steps{
  BASIC_DETAILS = 0,
  VIDEO_CHAT_LINK,
  MOURNERS,
  VISITS,
  DONE
}
export interface BasicDetailsProps {
  nameOfDeceased: string
  startDate: moment.Moment
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
  submit: (data:T, nextStep: Steps) => void
  selectStep: (step: number) => void

}

export interface VisitingStepProps<T> extends StepProps<T> {
  startDate: moment.Moment
  endDate?: moment.Moment
}

  