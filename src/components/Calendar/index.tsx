import React from 'react'
import { Shiva } from '../../store/shiva/types'
import { Row, ColumnContainer, FixedColumn, FlexColumn } from '../flexLayout'
import { CalendarMode } from '../types'
import { CalendarProvider } from './context'
import { Grid } from './grid'
import { VerticalRuler, HorizontalRuler } from './rulers'
import { CalendarWrapper, Timezone } from './styles'


export interface Props extends Shiva {
  mode: CalendarMode
  height?: string
}
const Calendar = ({ startDate, endDate, visits, mourners, mode, height }: Props) => {
  const sideBarWidth = 60
  return (
    <CalendarProvider mode={mode} startHour={9} endHour={22}>
      <CalendarWrapper height={height}>
        <ColumnContainer width={'100%'}>
          <Row>
            <FixedColumn width={sideBarWidth}>
              <Timezone>EST</Timezone>
            </FixedColumn>
            <FlexColumn>
              <HorizontalRuler startDate={startDate} endDate={endDate} />
            </FlexColumn>
          </Row>
          <div style={{ overflowY: 'auto' }}>
            <Row>
              <FixedColumn width={sideBarWidth}>
                <VerticalRuler />
              </FixedColumn>
              <FlexColumn>
                <Grid startDate={startDate} endDate={endDate} visits={visits} mourners={mourners} />
              </FlexColumn>
            </Row>
          </div>
        </ColumnContainer>
      </CalendarWrapper>
    </CalendarProvider>
  )
}

export default Calendar
