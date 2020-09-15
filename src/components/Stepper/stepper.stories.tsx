import React from "react"
import Stepper from './'


export default {
  title: 'Stepper',
  component: Stepper,
  argTypes: {
    diameter: { control: 'number' },
  },
}

export const Default = () => (<Stepper diameter={45} gap={100} width={100} numOfSteps={4} selectedStep={1}/>)

