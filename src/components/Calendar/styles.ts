import styled from 'styled-components'


export const CalendarWrapper = styled.div`
  display: flex;
  padding: 5px;
`

export const Timezone = styled.div`
  display: flex;
  flex-direction: column;
  width: 70px;
  height: 30px;
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

export const HRulerWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  height: 30px;
`

export const Hour = styled.div`
  color: ${props=> props.theme.colors.doveGray};;
  text-align: right;
  font-size: 13px;
  height: 42px;
  margin-right:18px;
`

export const Day = styled.div`
  color: ${props=> props.theme.colors.heavyMetal};
  text-align: center;
  font-size: 16px;
`

export const GridWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  background-color: white;
`

export const Column = styled.div`
   background-image: repeating-linear-gradient(0deg, #f1edf6, #f1edf6 1px, white 1px, white 42px);
   background-position: 100px;
   height: 600px;
`