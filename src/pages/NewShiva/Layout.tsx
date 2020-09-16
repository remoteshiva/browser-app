import React, { ReactNode } from 'react'
import styled from 'styled-components'
import BasicDetailsArt from '../../assets/img/add-basic-details.svg'
import Stepper from '../../components/Stepper'
import { SubmitButton } from './styles'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props=> props.theme.colors.heavyMetal};
  margin-top: 76px;
  h2{
    font-family: 'Lora';
    font-size: 34px;
  }
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: flex-end;
  img{
    margin-right: 113px;
  }
`

interface Props {
  title: string
  step: number
  submit: ()=> void
  submitText: string
  children: ReactNode
  withGraphics?: boolean
}

const StepLayout = ({title, step, submit, submitText, children, withGraphics}:Props) => {
  return(
    <Wrapper>
      <div style={{width: '200px'}}>
        <Stepper
          numOfSteps={4}
          selectedStep={step}
          diameter={36}
          gap={100}
          width={100}
        />
      </div>
      <div id='the-step' style={{width: '327px'}}>
        <h2>{step}. {title}</h2>
        {children}
        <SubmitButton onClick={submit}>{submitText}</SubmitButton>
      </div>
      <ImageWrapper>
        {withGraphics ? <img src={BasicDetailsArt} alt='basic details'/> : null}
      </ImageWrapper>
    </Wrapper>
    )
}

export default StepLayout