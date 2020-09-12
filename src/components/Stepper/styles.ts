import styled from 'styled-components'


interface StepperWrapperProps {
  width: number
}

export const StepperWrapper = styled.ul<StepperWrapperProps>`
  width: ${props => `${props.width}px`};
  list-style-type:none;
  padding-inline-start: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 10px;
`


interface StepNumberProps {
  readonly diameter: number
  readonly gap?: number
  readonly selected?: boolean
}

export const StepNumber = styled.li<StepNumberProps>`
  border-radius: 50%;
  border: 1px solid ${props=> props.selected ? props.theme.colors.richGold : props.theme.colors.hintOfRed};
  background-color: ${props=> props.selected ? props.theme.colors.richGold : props.theme.colors.hintOfRed};
  color: ${props=> props.selected ? '#fff' : props.theme.colors.richGold};
  width: ${props => `${props.diameter}px`};
  height: ${props => `${props.diameter}px`};
  line-height: ${props => `${props.diameter}px`};
  font-family: 'Lato';
  font-weight: bold;
  font-size: 16px;
  padding: 3px;
  text-align: center;
  z-index:10;
  margin-bottom: ${props => props.gap ? `${props.gap}px` : `${props.diameter}px`};
  &:last-of-type {
    margin-bottom:0;
  }
`

export const StepConnector = styled.div`
  height: 100%;
  width: 2px;
  background-color: ${props=> props.theme.colors.hintOfRed};
  position: absolute;
  top: 0;
  left: 50%;
  z-index:1;
`
