import React from 'react'
import { 
  StepperWrapper,
  StepNumber,
  StepConnector
 } from './styles'

interface StepperProps {
  currentStep: number
  steps: string[]
}


const Stepper = ({currentStep, steps}: StepperProps) => {
  return(
    <StepperWrapper width={100}>
      { steps.map( (step, index)=>{
        return(
          <StepNumber
            key={index}
            selected={index+1 === currentStep ? true: false}
            radius={36}
            gap={100}
          >
            {index+1}
          </StepNumber>
        )
      })}
      <StepConnector/>
    </StepperWrapper>
  )
}

export default Stepper