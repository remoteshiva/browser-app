import React from 'react'
import { Visit } from '../../store/shiva/types'
import { Row, ColumnContainer, FixedColumn, FlexColumn } from '../flexLayout'
import { CalendarProvider } from './context'
import { Grid } from './grid'
import { VerticalRuler, HorizontalRuler } from './rulers'
import { CalendarWrapper, Timezone } from './styles'

interface Props {
  startDate: moment.Moment
  endDate?: moment.Moment
  visits: Visit[]
  editMode: boolean
  height?: string
}
const Calendar = ({ startDate, endDate, visits, editMode = false, height }: Props) => {
  const sideBarWidth = 60
  const numOfDays = endDate ? endDate.diff(startDate, 'days') : 7
  return (
    <CalendarProvider startHour={9} endHour={22}>
      <CalendarWrapper height={height}>
        <ColumnContainer width={'100%'}>
          <Row>
            <FixedColumn width={sideBarWidth}>
              <Timezone>EST</Timezone>
            </FixedColumn>
            <FlexColumn>
              <HorizontalRuler startDate={startDate} numOfDays={numOfDays} />
            </FlexColumn>
          </Row>
          <div style={{ overflowY: 'auto' }}>
            <Row>
              <FixedColumn width={sideBarWidth}>
                <VerticalRuler />
              </FixedColumn>
              <FlexColumn>
                <Grid editMode={editMode} startDate={startDate} numOfDays={numOfDays} visits={visits} />
              </FlexColumn>
            </Row>
          </div>
        </ColumnContainer>
      </CalendarWrapper>
    </CalendarProvider>
  )
}

export default Calendar
