import styled from 'styled-components'

export const LayoutWrapper = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.colors.sauvignon};
  a {
    color: ${props => props.theme.colors.blueChill};
    font-size: 16px;
  }
`

interface FlexContainerProps {
  minWidth?: number
}
export const FlexContainer = styled.div<FlexContainerProps>`
  flex: 1;
  padding: 10px;
  min-width: ${props => (props.minWidth? `${props.minWidth}px`:'auto')};
`

export enum Direction{
  row = 'row',
  column = 'column'
}
interface CardProps {
  direction?: Direction
}
export const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: ${props=>props.direction ? props.direction : 'row'};
  overflow: hidden;
  word-break: break-all;
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.04);
  h2 {
    font-family: 'Lora';
    font-size: 28px;
    width: 100%;
    color: ${props=> props.theme.colors.heavyMetal};
    margin-bottom: 12px;
  }
  h4 {
    font-family: 'Lato';
    font-size: 16px;
    margin-bottom: 20px;
  }
`
export const TitleImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 6px solid ${props=> props.theme.colors.romance};
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
`
export const ShivaTitle = styled.div`
  /* flex-shrink:0 !important; */
  min-width: 40%;
  font-size: 48px;
  font-family: 'Lora';
  color: ${props=> props.theme.colors.heavyMetal};
`
// TODO: get rid of this
export const Button = styled.button`
  background-color: ${props=> props.theme.colors.richGold};
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
  color: ${props=> props.theme.colors.white};
  font-size: 18px;
  width: 100%;
`

export const MournerName = styled.div`
  flex: 1;
  font-family: 'Lato';
  font-size: 16px;
`

export const Relationship = styled.div`
  flex: 1;
  font-weight: 100;
  font-style: italic;
  color: ${props=> props.theme.colors.doveGray};
`

export const Note = styled.div`
  color: ${props => props.theme.colors.doveGray};
  font-size: 13px;
  font-family: 'Lato';
`