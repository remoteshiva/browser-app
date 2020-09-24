import React, { useState } from "react"
import Stepper from './'


export default {
  title: 'Stepper',
  component: Stepper,
  argTypes: {
    diameter: { control: 'number' },
  },
}

export const Default = () => (
  <Stepper 
    diameter={45}
    gap={100}
    width={100}
    numOfSteps={4}
    selectedStep={1}
  />)

export const WithEvent = () => (
  <Stepper
    diameter={45}
    gap={100}
    width={200}
    numOfSteps={5}
    selectedStep={2}
    onSelectStep={(step:number)=>{
      alert(`clicked step ${step}`)
    }}
  />)

export const WithChangeSelectedStep = () => {
  const [step, setStep] = useState(1)
  return (
    <Stepper 
      diameter={45}
      gap={50}
      width={100}
      numOfSteps={6}
      selectedStep={step}
      onSelectStep={(step:number) => setStep(step)}
    /> 
  )
}
