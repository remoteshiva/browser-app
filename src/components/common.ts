import styled from 'styled-components'

// spacers
interface SpaceProps {
  height: number
}
export const VerticalSpace = styled.div<SpaceProps>`
  height: ${props => `${props.height}px`};
  width: 100%;
`
// buttons
const Button = styled.button`
  border-radius: 15px;
  padding: 23px 85px 23px 85px;
  text-align: center;
  font-size: 18px;
`
export const LightButton = styled(Button)`
  border: solid 1px ${props => props.theme.colors.richGold};
  background-color: ${props => props.theme.colors.white};
  color: ${ props => props.theme.colors.richGold };
`
export const DarkButton = styled(Button)`
  background-color: ${props => props.theme.colors.richGold};
  color: ${props => props.theme.colors.white};
`

export const ApproveButton = styled(Button)`
  background-color: ${props => props.theme.colors.blueChill};
  color: ${props => props.theme.colors.white};
  box-shadow: 0 4px 23px 0 rgba(36, 67, 67, 0.27);
`
