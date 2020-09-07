import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import styled from 'styled-components'
import { AppState } from '../../store'
import BackArrowIcon from '../../assets/img/back-arrow.svg'
import BasicDetails from './BasicDetails'
import VideoChatLink from './VideoChatLink'
import Mourners from './Mourners'
import VisitingHours from './VisitingHours'


const Wrapper = styled.div`
  padding-top: 24px;
  padding-left: 30px;
`

const BackArrow = styled.img`
  width: 18px;
  height: 15px;
  margin-right: 9px;
  object-fit: contain;
  display: inline-block;
`

const Back = () => {
  const dispatch = useDispatch()
  return(
    <div onClick={() => dispatch(push('/dashboard'))}>
      <div>
        <BackArrow src={BackArrowIcon}/>
        Back to my shivas
      </div>
    </div>
  )
}

const NewShiva = () => {
  const [step, setStep] = useState(0);
  const numOfSteps = 4

  const nextStep = () => {
    if(step < numOfSteps){
      setStep(step+1)
    }
  }

  const createShiva = () => {
    setStep(0)
  }
  const renderStep = () => {
    switch(step){
      case 0:
        return (<BasicDetails next={nextStep}/>)
      case 1:
        return (<VideoChatLink next={nextStep}/>)
      case 2:
        return (<Mourners next={nextStep}/>)
      case 3:
        return (<VisitingHours next={createShiva}/>)
    }
  }
  return(
    <Wrapper>
      <Back/>
       {renderStep()}
    </Wrapper>
  )
}

const mapStateToProps = (state: AppState) => ({
  shivaState: state.shiva,
})

export default connect(mapStateToProps, {})(NewShiva)