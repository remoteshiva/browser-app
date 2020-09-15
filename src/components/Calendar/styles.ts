import styled from 'styled-components'


export const PIXELS_PER_HOUR = 40
export const PIXELS_PER_MINUTE = PIXELS_PER_HOUR / 60
export const SNAP = 15
export type Pixels = number

export const CalendarWrapper = styled.div`
  display: flex;
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
  display: flex;
  flex-direction: column;
  width: 70px;
  /* height: 600px; */
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

interface GridWrapperProps {
  numOfColumns: number
}
export const GridWrapper = styled.div<GridWrapperProps>`
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numOfColumns}, minmax(0, 1fr));
  background-color: white;
  cursor: crosshair !important;
`

export const ColumnWrapper = styled.div`
  background-image: repeating-linear-gradient(180deg, #f1edf6 , #f1edf6 1px, white 1px, white ${PIXELS_PER_HOUR}px);
  background-position: 100px;
  height: 600px;
  position: relative;
  padding: 0 10px;
`

interface EventWrapperProps {
  top: number
  height: number
}

export const EventWrapper = styled.div<EventWrapperProps>`
  position: absolute;
  width: 100%;
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