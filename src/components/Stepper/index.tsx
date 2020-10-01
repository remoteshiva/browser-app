import React from 'react'
import { StepperWrapper, StepNumber, StepConnector } from './styles'

const noop = (step: number) => {}

interface StepperProps {
  width: number
  numOfSteps: number
  diameter: number
  gap?: number
  selectedStep: number
  onSelectStep?: (step: number) => void
}

const Stepper = ({ selectedStep, numOfSteps, diameter, gap, width = 100, onSelectStep }: StepperProps) => {
  const steps = Array.from({ length: numOfSteps }, (_, i) => i)
  return (
    <StepperWrapper width={width}>
      {steps.map((_, index) => {
        return (
          <StepNumber key={index} selected={index + 1 === selectedStep ? true : false} diameter={diameter} gap={gap} onClick={() => (onSelectStep ? onSelectStep(index + 1) : noop)}>
            {index + 1}
          </StepNumber>
        )
      })}
      <StepConnector />
    </StepperWrapper>
  )
}

export default Stepper
