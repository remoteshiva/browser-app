import React, { useState } from 'react'
import { StepProps, VisitingProps, Steps } from './types'
import { Row, FixedColumn, FlexColumn } from '../../components/flexLayout'
import Editable from '../../components/Editable'
import StepLayout from './Layout'
import Calendar from '../../components/Calendar'
import { CalendarContainer, Minyan } from './styles'


const VisitingHours = ({ newShiva, submit, selectStep }: StepProps<VisitingProps>) => {
  const [minyanTimes, setMinyanTimes] = useState(newShiva.minyanTimes)
  const handleInput = (html: string) => {
    setMinyanTimes(html)
  }
  return (
    <StepLayout title={'Set visiting hours'} step={4} submit={() => submit({visits: newShiva.visits, minyanTimes }, Steps.DONE)} submitText="Done" stepperClickHandler={selectStep}>
      <Row>
        <FixedColumn width={500}>
          <p>Specify the times when visitors should be able to join the video chatroom by clicking and dragging on the calendar.</p>
          <br />
          <p>By default, all mourners will be listed as attending all visiting hours. Once your shiva is created, you can edit this.</p>
          <br />
        </FixedColumn>
      </Row>
      <Row>
        <FlexColumn>
          <CalendarContainer>
            <Calendar role='Editor' mode='Edit'  {...newShiva} />
          </CalendarContainer>
        </FlexColumn>
      </Row>
      <Row>
        <Minyan>
          <h2>Add Minyan Times</h2>&nbsp;&nbsp;
          <div className="optional">(Optional)</div>
          <p>If you’d like to have minyan, write which times minyan will take place and the link visitors will use to join the minyan.</p>
          <Editable className="minyan" active={true} onInput={handleInput} html={minyanTimes || ''} placeholder="Type something here"/>
        </Minyan>
      </Row>
    </StepLayout>
  )
}

export default VisitingHours
