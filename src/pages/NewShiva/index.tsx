import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { push } from 'connected-react-router'
import styled from 'styled-components'
import * as Routes from '../../routes'
import { AppDispatch, RootState } from '../../store'
import { Shiva } from '../../store/shiva/types'
import { selectShiva, initNewShiva, updateNewShiva, deleteNewShiva } from '../../store/shiva/actions'
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
  const dispatch = useDispatch<AppDispatch>()
  const { step } = useParams<MatchParams>()
  const { newShiva } = useSelector((state: RootState) => state.shiva)
  const [currentStep, setCurrentStep] = useState<T.Steps>(Number(step))

  useEffect(()=>{
    if(newShiva ===null ){
      dispatch(initNewShiva())
      dispatch(push(Routes.NEW_SHIVA('1')))
    }
  },[newShiva, dispatch, step])

  const submitStepData = async <T extends {}>(data: T, nextStep: T.Steps) => {
    if(newShiva){
      setCurrentStep(nextStep)
      if (nextStep === T.Steps.DONE) {
        try {
          // create the new shiva on the backend
          const { id } = await dispatch(createShiva(newShiva))
          // select the new shiva before navigating to its page
          dispatch(selectShiva(id))
          dispatch(push(Routes.SHIVA_PAGE(id)))
          // clean up
          dispatch(deleteNewShiva())
        } catch (error) {
          console.log('Failed to create new Shiva', error)
        }
      } else {
        // update new shiva with data
        dispatch(updateNewShiva(data))
        dispatch(push(Routes.NEW_SHIVA(`${nextStep}`)))
      }
    }
  }
  const selectStep = (step: number) => {
    setCurrentStep(step)
    dispatch(push(Routes.NEW_SHIVA(`${step}`)))
  }

  const renderStep = () => {
    console.log('render step', newShiva)
    if(newShiva !==null){
      switch (currentStep) {
        case T.Steps.BASIC_DETAILS:
          return <BasicDetails newShiva={newShiva} submit={(data: T.BasicDetailsProps, nextStep: T.Steps) => submitStepData<T.BasicDetailsProps>(data, nextStep)} selectStep={selectStep} />
        case T.Steps.VIDEO_CHAT_LINK:
          return <VideoChatLink newShiva={newShiva} submit={(data: T.ChatProps, nextStep: T.Steps) => submitStepData<T.ChatProps>(data, nextStep)} selectStep={selectStep} />
        case T.Steps.MOURNERS:
          return <Mourners newShiva={newShiva} submit={(data: T.MournersProps, nextStep: T.Steps) => submitStepData<T.MournersProps>(data, nextStep)} selectStep={selectStep} />
        case T.Steps.VISITS:
          return (
            <VisitingHours
              newShiva={newShiva}
              startDate={newShiva.startDate}
              endDate={newShiva.endDate}
              submit={(data: T.VisitingProps, nextStep: T.Steps) => submitStepData<T.VisitingProps>(data, nextStep)}
              selectStep={selectStep}
            />
          )
      }
    }else{
      return null
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
