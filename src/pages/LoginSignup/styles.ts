import styled from 'styled-components'

export const UXWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 77px;
  background-color: ${props => props.theme.colors.sauvignon};
`

export const GraphicsWrapper = styled.div`
  height: 110%;
  background-color: #fff;
  img {
    display: block;
    padding-top: 167px;
    margin-left: auto;
    margin-right: auto;
  }
`

export const TabsWrapper = styled.div`
  flex: 1;
  display: flex;
  margin-top: 78px;
  height: 75px;
`

interface TabProps {
  active?: boolean
}
export const Tab = styled.button<TabProps>`
  flex: 50%;
  text-align: center;
  font-family: 'Lora';
  font-size: 43px;
  line-height: 58px;
  margin-right: 1rem;
  color: ${props => props.theme.colors.heavyMetal};
  opacity: ${props => (props.active ? 1 : 0.21)};
  border-bottom: ${props => (props.active ? 'solid 2px #41413a' : 'solid 2px transparent')};
  cursor: pointer;
  &:hover {
    border-bottom: solid 2px #41413a;
  }
`
interface SpaceProps {
  height: number
}
export const VerticalSpace = styled.div<SpaceProps>`
  height: ${props => `${props.height}px`};
  width: 100%;
`

export const StyledForm = styled.form`
  text-align: left;
  label {
    color: ${props => props.theme.colors.doveGray};
    font-size: 16px;
  }
  input {
    border-radius: 2px;
    border: solid 1px ${props => props.theme.colors.sauvignonLight};
  }
`

export const TextWithLine = styled.div`
  display: flex;
  flex-direction: row;
  &:before,
  &:after {
    content: '';
    flex: 1 1;
    border-bottom: 1px solid #000;
    margin: auto;
  }
  &:before {
    margin-right: 10px;
  }
  &:after {
    margin-left: 10px;
  }
`
