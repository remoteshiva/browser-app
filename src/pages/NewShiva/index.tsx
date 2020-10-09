import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { push } from 'connected-react-router'
import styled from 'styled-components'
import * as Routes from '../../routes'
import { RootState } from '../../store'
import { Shiva, initializeShiva } from '../../store/shiva/types'
import { createShiva } from '../../services/shiva'
import Toast, { ToastModel, Position } from '../../components/Toast'
import BackButton from './back'
import BasicDetails from './BasicDetails'
import VideoChatLink from './VideoChatLink'
import Mourners from './Mourners'
import VisitingHours from './VisitingHours'

import * as T from './types'

const Wrapper = styled.div`
  padding: 24px 30px;
  .error {
    color: ${props => props.theme.colors.cardinal};
  }
`
interface MatchParams {
  step: string | undefined
}

const NewShiva = () => {
  const { selectedShiva } = useSelector((state: RootState) => state.shiva)
  const { step } = useParams<MatchParams>()
  const [currentStep, setCurrentStep] = useState<T.Steps>(Number(step))
  const [shiva, setShiva] = useState<Shiva>(initializeShiva())
  const [toasts, setToasts] = useState<ToastModel[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedShiva) {
      // once the shiva is created and selected, navigate to the shiva page
      dispatch(push(Routes.SHIVA_PAGE(selectedShiva), { newShiva: true }))
    }
  }, [selectedShiva, dispatch])
  const submitStepData = <T extends {}>(data: T, nextStep: T.Steps) => {
    setShiva(s => ({ ...s, ...data }))
    setCurrentStep(nextStep)
    if (nextStep === T.Steps.DONE) {
      dispatch(createShiva(shiva))
    } else {
      dispatch(push(Routes.NEW_SHIVA(`${nextStep}`)))
    }
  }
  const addNotification = (toast: ToastModel) => {
    setToasts([...toasts, toast])
  }

  const selectStep = (step: number) => {
    setCurrentStep(step)
    dispatch(push(Routes.NEW_SHIVA(`${step}`)))
  }

  const renderStep = () => {
    switch (currentStep) {
      case T.Steps.BASIC_DETAILS:
        return <BasicDetails newShiva={shiva} submit={(data: T.BasicDetailsProps, nextStep: T.Steps) => submitStepData<T.BasicDetailsProps>(data, nextStep)} selectStep={selectStep} />
      case T.Steps.VIDEO_CHAT_LINK:
        return <VideoChatLink newShiva={shiva} submit={(data: T.ChatProps, nextStep: T.Steps) => submitStepData<T.ChatProps>(data, nextStep)} selectStep={selectStep} />
      case T.Steps.MOURNERS:
        return (
          <Mourners newShiva={shiva} submit={(data: T.MournersProps, nextStep: T.Steps) => submitStepData<T.MournersProps>(data, nextStep)} selectStep={selectStep} addNotification={addNotification} />
        )
      case T.Steps.VISITS:
        return (
          <VisitingHours
            newShiva={shiva}
            startDate={shiva.startDate}
            endDate={shiva.endDate}
            submit={(data: T.VisitingProps, nextStep: T.Steps) => submitStepData<T.VisitingProps>(data, nextStep)}
            selectStep={selectStep}
          />
        )
    }
  }
  return (
    <Wrapper>
      <BackButton />
      {renderStep()}
      <Toast toasts={toasts} autoDelete={true} position={Position.br} />
    </Wrapper>
  )
}

export default NewShiva
