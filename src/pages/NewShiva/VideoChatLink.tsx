import React from 'react'
import StepLayout, { StepProps } from './Layout'

const VideoChatLink = (props: StepProps) => {
  return(
    <StepLayout
      title={'Add video chat link'}
      step={2}
      withGraphics={true}
      submit={props.next}
      submitText='Next: Add mourners'
    >
      <div>Video Chat Link</div>
    </StepLayout>
  )
}

export default VideoChatLink