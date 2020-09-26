import React, { ReactNode } from 'react'
import styled from 'styled-components'
import Stepper from '../../components/Stepper'
import { Row, FixedColumn, FlexColumn } from '../../components/flexLayout'
import { SubmitButton } from './styles'

const noop = () => {}

const H2 = styled.h2`
  font-family: 'Lora';
  font-size: 34px;
  font-weight: 500;
  color: ${props=> props.theme.colors.heavyMetal};
  margin-bottom: 25px;
`
interface Props {
  title: string
  step: number
  submit: ()=> void
  submitText: string
  children: ReactNode
  stepperClickHandler? : (step:number) => void
}

const Wrapper = styled.div`
  p {
    color: ${props => props.theme.colors.heavyMetal}; 
    font-size: 16px;
    line-height: 24px;
    white-space: pre-line;
  }
  a {
    color: ${props => props.theme.colors.blueChill};
  }
`

const StepLayout = ({title, step, submit, submitText, children, stepperClickHandler}:Props) => (
  <Wrapper>
    <Row>
    <FixedColumn width={254}>
      <Stepper
        numOfSteps={4}
        selectedStep={step}
        diameter={36}
        gap={90}
        width={162}
        onSelectStep={(step: number) => (stepperClickHandler ? stepperClickHandler(step) : noop)}
      />
    </FixedColumn>
    <FlexColumn>
      <Row>
        <FixedColumn width={360}><H2>{step}. {title}</H2></FixedColumn>
      </Row>
      <div style={{minHeight: '400px'}}>
        <Row>
          <FlexColumn>{children}</FlexColumn>
        </Row>
      </div>
      <Row height={100}>
        <FixedColumn width={350}><SubmitButton onClick={submit}>{submitText}</SubmitButton></FixedColumn>
      </Row>
      <Row height={242}></Row>
    </FlexColumn>
  </Row>
  </Wrapper>
)

export default StepLayout