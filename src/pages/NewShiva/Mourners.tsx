import React from 'react'
import StepLayout, { StepProps } from './Layout'

const Mourners = (props: StepProps) => {
  return(
    <StepLayout
      title={'Add mourners'}
      step={3}
      withGraphics={true}
      submit={props.next}
      submitText='Next: Set visiting hours'
    >
      <div>Mourners</div>
    </StepLayout>
  )
}

export default Mourners