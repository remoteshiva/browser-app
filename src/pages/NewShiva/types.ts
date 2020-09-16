import { Mourner, Visit } from '../../store/shiva/types'

export interface BasicDetailsProps {
  nameOfDeceased: string
  startDate: string
  message?: string
}

export interface MournersProps {
  mourners: Mourner[]
}

export interface ChatProps {
  videoChatLink: URL | null
}

export interface VisitingProps {
  visits: Visit[]
}

export interface StepProps<T> {
  submit: (props:T) => void
}

// export interface StepProps {
//   next: () => void
// }

  