import styled from 'styled-components'


export const PIXELS_PER_HOUR = 40
export const PIXELS_PER_MINUTE = PIXELS_PER_HOUR / 60
export const SNAP = 15
export type Pixels = number

interface CalendarWrapperProps {
  height?: string
}
export const CalendarWrapper = styled.div<CalendarWrapperProps>`
  display: flex;
  background-color: white;
  padding: 38px 40px;
  height: ${props => props.height? props.height : 'auto'};
`

export const Timezone = styled.div`
  display: flex;
  flex-direction: column;
  width: 70px;
  height: 26px;
  font-family: 'Lato';
  font-size: 12px;
  color: ${props=> props.theme.colors.heavyMetal};
  text-align: center;
`
export const VRulerWrapper = styled.div`
  width: 70px;
`

interface HRulerWrapper {
  numOfColumns: number
}
export const HRulerWrapper = styled.div<HRulerWrapper>`
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numOfColumns}, minmax(0, 1fr));
  height: 30px;
  margin-bottom: 6px;
  font-family: 'Lato';
`

export const Hour = styled.div`
  color: ${props=> props.theme.colors.doveGray};
  text-align: right;
  font-family: 'Lato';
  font-size: 13px;
  height:  ${PIXELS_PER_HOUR}px;
  margin-right:18px;
`

export const Day = styled.div`
  color: ${props=> props.theme.colors.heavyMetal};
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
`

interface GridProps {
  numOfColumns: number
}
export const GridContainer = styled.div<GridProps>`
  width: 100%;
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  /* overflow-y:hidden; */
`

export const GridBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-start: 1;
  grid-row-start: 1;
  z-index: 1;
  color: ${props=> props.theme.colors.doveGray};
  font-size: 26px;
  opacity: 0.62;
`

export const GridColumns = styled.div<GridProps>`
  display: grid;
  grid-column-start: 1;
  grid-row-start: 1;
  grid-template-columns: repeat(${props => props.numOfColumns}, minmax(0, 1fr));
  z-index: 2;
`

interface ColumnWrapper {
  height?: string
}
export const ColumnWrapper = styled.div<ColumnWrapper>`
  box-sizing: border-box;
  background-color: transparent;
  background-image: repeating-linear-gradient(180deg, #f1edf6 , #f1edf6 1px, transparent 1px, transparent ${PIXELS_PER_HOUR}px);
  background-position: 100px;
  position: relative;
  height: ${props => props.height? props.height: 'auto'};
  overflow: hidden;
  cursor: crosshair !important;
`

interface EventWrapperProps {
  top: number
  height: number
}

export const EventWrapper = styled.div<EventWrapperProps>`
  position: absolute;
  box-sizing: border-box;
  width: 90%;
  margin: 0 5% 0 5%;
  height: ${ props => `${props.height}px`};
  top: ${ props => `${props.top}px`};
  background-color: rgba(146, 70, 35, 0.12);
  font-family: 'Lato';
  font-size: 13px;
  padding: 4px;
  color:  ${props=> props.theme.colors.richGold};
  >div {
    font-family: 'Lato';
    font-size: 13px;
    line-height: 18px;
  }
`