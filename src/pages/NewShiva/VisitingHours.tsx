import React, { useState } from 'react'
import { StepProps, VisitingProps } from './types'
import StepLayout from './Layout'
import Calendar from '../../components/Calendar'

const VisitingHours = ({submit}: StepProps<VisitingProps>) => {
  const [values, setValues] = useState({visits: []})
  return(
    <StepLayout
      title={'Set visiting hours'}
      step={4}
      withGraphics={false}
      submit={() => submit({...values})}
      submitText='Done'
    >
    <Calendar editMode={true}/> 

    </StepLayout>
    )
}

export default VisitingHours