import React, { useState } from 'react'
import { VisitingStepProps, VisitingProps, Steps } from './types'
import { Row, FixedColumn, FlexColumn } from '../../components/flexLayout'
import StepLayout from './Layout'
import Calendar from '../../components/Calendar'

const VisitingHours = ({newShiva, startDate, endDate, submit, selectStep}: VisitingStepProps<VisitingProps>) => {
  const [values, setValues] = useState({visits: newShiva.visits})
  return(
    <StepLayout
      title={'Set visiting hours'}
      step={4}
      submit={() => submit({...values}, Steps.DONE)}
      submitText='Done'
      stepperClickHandler={selectStep}
    >
      <Row>
        <FixedColumn width={500}>
        <p>Specify the times when visitors should be able to join the video chatroom by clicking and dragging on the calendar.</p>
        <br/>
        <p>By default, all mourners will be listed as attending all visiting hours. Once your shiva is created, you can edit this.</p>
        <br/>
        </FixedColumn>
      </Row>
      <Row>
        <FlexColumn>
          <Calendar height={'431px'} editMode={true} startDate={startDate} endDate={endDate} visits={values.visits}/> 
        </FlexColumn>
      </Row>
      <Row>
        Add Minian Times
      </Row>
      

    </StepLayout>
    )
}

export default VisitingHours