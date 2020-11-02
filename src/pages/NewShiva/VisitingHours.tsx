import React, { useState } from 'react'
import styled from 'styled-components'
import { VisitingStepProps, VisitingProps, Steps } from './types'
import { Row, FixedColumn, FlexColumn } from '../../components/flexLayout'
import Editable from '../../components/Editable'
import StepLayout from './Layout'
import Calendar from '../../components/Calendar'

const Minian = styled.div`
  margin-top: 40px;
  width: 500px;
  h2 {
    display: inline-block;
    color: ${props => props.theme.colors.heavyMetal};
    font-size: 28px;
    font-family: 'Lora';
  }
  .optional {
    display: inline-block;
    color: ${props => props.theme.colors.doveGray};
    font-size: 18px;
    font-family: 'Lora';
  }
  p {
    color: ${props => props.theme.colors.heavyMetal};
    font-family: 'Lato';
    font-size: 16px;
    line-height: 24px;
  }
  .minian {
    margin-top: 30px;
    width: 327px;
    height: 177px;
    border: solid 1px ${props => props.theme.colors.sauvignonLight};
    padding: 12px;
  }
`

const VisitingHours = ({ newShiva, startDate, endDate, submit, selectStep }: VisitingStepProps<VisitingProps>) => {
  const [visits, SetVisits] = useState(newShiva.visits)
  const [minianTimes, setMinianTimes] = useState(newShiva.minianTimes)
  const handleInput = (html: string) => {
    setMinianTimes(html)
  }
  return (
    <StepLayout title={'Set visiting hours'} step={4} submit={() => submit({visits, minianTimes }, Steps.DONE)} submitText="Done" stepperClickHandler={selectStep}>
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
          <Calendar height={'431px'} mode='Add'  {...newShiva} />
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
