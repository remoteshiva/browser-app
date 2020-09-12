import React from 'react'
import { 
  StepperWrapper,
  StepNumber,
  StepConnector
 } from './styles'

interface StepperProps {
  width: number
  numOfSteps: 4
  diameter: number
  gap?: number
  selectedStep: number
}


const Stepper = ({selectedStep, numOfSteps, diameter, gap, width=100}: StepperProps) => {
  const steps = Array.from({length:numOfSteps}, (_,i) => i)   
  return(
    <StepperWrapper width={width}>
      { steps.map( (_, index)=>{
        return(
          <StepNumber
            key={index}
            selected={index+1 === selectedStep ? true: false}
            diameter={diameter}
            gap={gap}
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