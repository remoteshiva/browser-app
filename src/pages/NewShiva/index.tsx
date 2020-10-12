import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { push } from 'connected-react-router'
import styled from 'styled-components'
import * as Routes from '../../routes'
import { AppDispatch } from '../../store'
import { Shiva, initializeShiva } from '../../store/shiva/types'
import { selectShiva } from '../../store/shiva/actions'
import { createShiva } from '../../services/shiva'
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
  const { step } = useParams<MatchParams>()
  const [currentStep, setCurrentStep] = useState<T.Steps>(Number(step))
  const [shiva, setShiva] = useState<Shiva>(initializeShiva())
  const dispatch = useDispatch<AppDispatch>()

  const submitStepData = async <T extends {}>(data: T, nextStep: T.Steps) => {
    setShiva(s => ({ ...s, ...data }))
    setCurrentStep(nextStep)
    if (nextStep === T.Steps.DONE) {
      try {
        const { id } = await dispatch(createShiva(shiva))
        await dispatch(selectShiva(id))
        dispatch(push(Routes.SHIVA_PAGE(id)))
      } catch (error) {
        console.log('Failed to create new Shiva', error)
      }
    } else {
      dispatch(push(Routes.NEW_SHIVA(`${nextStep}`)))
    }
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
        return <Mourners newShiva={shiva} submit={(data: T.MournersProps, nextStep: T.Steps) => submitStepData<T.MournersProps>(data, nextStep)} selectStep={selectStep} />
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
    </Wrapper>
  )
}

export default NewShiva
