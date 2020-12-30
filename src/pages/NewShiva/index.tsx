import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Prompt} from 'react-router'
import { useParams } from 'react-router'
import { push } from 'connected-react-router'
import styled from 'styled-components'
import * as Routes from '../../routes'
import { AppDispatch, RootState } from '../../store'
import { selectShiva, initNewShiva, updateNewShiva, deleteNewShiva } from '../../store/shiva/actions'
import { postShiva } from '../../services/shiva'
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

  useEffect(() => {
    const commit = async () => {
      if (!newShiva) return
      try {
        // create the new shiva on the backend
        const { id } = await dispatch(postShiva(newShiva))
        // delete the newShiva object
        dispatch(deleteNewShiva())
        // select the new shiva before navigating to its page
        dispatch(selectShiva(id))
        dispatch(push(Routes.SHIVA_PAGE(id), { newShiva: true }))

      } catch (error) {
        console.log('Failed to create new Shiva', error)
      }
    }
    if (currentStep===T.Steps.DONE) {
      commit()
    }
  }, [currentStep, newShiva, dispatch])
  useEffect(() => {
    if (newShiva === null) {
      dispatch(initNewShiva())
      dispatch(push(Routes.NEW_SHIVA('1')))
      setCurrentStep(T.Steps.BASIC_DETAILS)
    }
    // dispatch(deleteNewShiva()); // TODO: INVESTIGATE
    return
  }, [dispatch, newShiva])

  const submitStepData = <T extends {}>(data: T, nextStep: T.Steps) => {
    if (newShiva) {
      dispatch(updateNewShiva(data))
      setCurrentStep(nextStep);
      dispatch(push(Routes.NEW_SHIVA(nextStep.toString())))
    }
  }
  const selectStep = (newStep: number) => {
    if (+newStep <= +currentStep) { // do not allow navigating forward
      setCurrentStep(newStep)
      dispatch(push(Routes.NEW_SHIVA(newStep.toString())))
    }
  }

  const renderStep = () => {
    if (newShiva !== null) {
      switch (currentStep) {
        case T.Steps.BASIC_DETAILS:
          return <BasicDetails newShiva={newShiva} submit={(data: T.BasicDetailsProps, nextStep: number) => submitStepData<T.BasicDetailsProps>(data, nextStep)} selectStep={selectStep} />
        case T.Steps.VIDEO_CHAT_LINK:
          return <VideoChatLink newShiva={newShiva} submit={(data: T.ChatProps, nextStep: number) => submitStepData<T.ChatProps>(data, nextStep)} selectStep={selectStep} />
        case T.Steps.MOURNERS:
          return <Mourners newShiva={newShiva} submit={(data: T.MournersProps, nextStep: number) => submitStepData<T.MournersProps>(data, nextStep)} selectStep={selectStep} />
        case T.Steps.VISITS:
          return (
            <VisitingHours
              newShiva={newShiva}
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
      <Prompt when={currentStep===T.Steps.DONE ? false : true} message={(location => {
        if(location.pathname.includes(Routes.NEW_SHIVA())){
          return false
        }
        return 'Are you sure you want to leave? Your shiva will not be saved.'
      })}/>
      <BackButton />
      {renderStep()}
    </Wrapper>
  )
}

export default NewShiva
