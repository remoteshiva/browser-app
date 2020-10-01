import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

interface Props {
  size: number
  thickness: number
}
const Spinner = styled.div<Props>`
  margin: auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: ${props => `${props.thickness}em`} solid ${props => props.theme.colors.richGold};
  border-right: ${props => `${props.thickness}em`} solid ${props => props.theme.colors.richGold};
  border-bottom: ${props => `${props.thickness}em`} solid rgba(222, 151, 27, 0.2);
  border-left: ${props => `${props.thickness}em`} solid ${props => props.theme.colors.richGold};
  transform: translateZ(0);
  animation: ${rotate} 2.1s infinite linear;
  border-radius: 50%;
  width: ${props => `${props.size}em`};
  height: ${props => `${props.size}em`};
  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`

export default Spinner
