import React from 'react';
import { utcToZonedTime, format } from 'date-fns-tz';
import { Shiva, Role } from '../../store/shiva/types';
import { Row, ColumnContainer, FixedColumn, FlexColumn } from '../flexLayout';
import { CalendarMode } from '../types';
import { CalendarProvider } from './context';
import { Grid } from './grid';
import { VerticalRuler, HorizontalRuler } from './rulers';
import { CalendarWrapper, Timezone } from './styles';

export interface Props extends Shiva {
  mode: CalendarMode;
  role: Role;
}
const Calendar = ({
  startDate,
  endDate,
  visits,
  mourners,
  mode,
  role,
}: Props) => {
  const sideBarWidth = 60;
  const date = Date.now();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = utcToZonedTime(date, timeZone);

  return (
    <CalendarProvider mode={mode} role={role} startHour={0} endHour={24}>
      <CalendarWrapper>
        <ColumnContainer width={'100%'}>
          <Row>
            <FixedColumn width={sideBarWidth}>
              <Timezone>
                {/* https://date-fns.org/v2.16.1/docs/Time-Zones */}
                {format(zonedDate, 'z', { timeZone }) || 'EST'}
              </Timezone>
            </FixedColumn>
            <FlexColumn>
              <HorizontalRuler startDate={startDate} endDate={endDate} />
            </FlexColumn>
          </Row>
          <Row>
            <FixedColumn width={sideBarWidth}>
              <VerticalRuler />
            </FixedColumn>
            <FlexColumn>
              <Grid
                startDate={startDate}
                endDate={endDate}
                visits={visits}
                mourners={mourners}
              />
            </FlexColumn>
          </Row>
        </ColumnContainer>
      </CalendarWrapper>
    </CalendarProvider>
  );
};

export default Calendar;
