import React from 'react'
import StepLayout, { StepProps } from './Layout'

const VisitingHours = (props: StepProps) => {
  return(
    <StepLayout
      title={'Set visiting hours'}
      step={4}
      withGraphics={false}
      submit={props.next}
      submitText='Done'
    >
      <div>Visiting Hours</div>
    </StepLayout>
    )
}

export default VisitingHours