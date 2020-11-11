import React, { useState } from 'react'
import { StepProps, VisitingProps, Steps } from './types'
import { Row, FixedColumn, FlexColumn } from '../../components/flexLayout'
import Editable from '../../components/Editable'
import StepLayout from './Layout'
import Calendar from '../../components/Calendar'
import { CalendarContainer, Minian } from './styles'


const VisitingHours = ({ newShiva, submit, selectStep }: StepProps<VisitingProps>) => {
  const [minianTimes, setMinianTimes] = useState(newShiva.minianTimes)
  const handleInput = (html: string) => {
    setMinianTimes(html)
  }
  return (
    <StepLayout title={'Set visiting hours'} step={4} submit={() => submit({visits: newShiva.visits, minianTimes }, Steps.DONE)} submitText="Done" stepperClickHandler={selectStep}>
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
            <Calendar role='Editor' mode='Add'  {...newShiva} />
          </CalendarContainer>
        </FlexColumn>
      </Row>
      <Row>
        <Minian>
          <h2>Add Minian Times</h2>&nbsp;&nbsp;
          <div className="optional">(Optional)</div>
          <p>If you’d like to have minyan, write which times minyan will take place and the link visitors will use to join the minyan.</p>
          <Editable className="minian" active={true} onInput={handleInput} html={minianTimes || ''} />
        </Minian>
      </Row>
    </StepLayout>
  )
}

export default VisitingHours
