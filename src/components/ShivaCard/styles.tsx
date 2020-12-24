import styled from 'styled-components'
import tw from 'twin.macro'
import { rgba } from 'polished'
import { ClickOutside } from '../ClickOutside'

export const ShivaListWrapper = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
`

const BaseItemWrapper = styled.li`
  margin-right: 40px;
  margin-bottom: 40px;
  width: ${props => props.theme.components.shivaCard.width};
  height: ${props => props.theme.components.shivaCard.height};
  border-radius: ${props => props.theme.components.shivaCard.borderRadius};
`

export const ShivaItemWrapper = styled(BaseItemWrapper)`
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.04);
  background-color: ${props => props.theme.colors.white};
  font-family: 'Lora';
  &:hover {
    border: 1px solid ${rgba('#924623', 0.15)};
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.18);
  }
  &:active {
    border: 0;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.04);
  }
  header {
    margin: 5px 10px 5px 10px;
  }
  section {
    margin: 85px 10px 5px 10px;
    > p {
      font-family: 'Lora';
      font-size: 34px;
      font-weight: 400;
    }
    > div {
      font-family: 'Lato';
      font-size: 16px;
    }
  }
`

export const NewShivaItemWrapper = styled(BaseItemWrapper)`
  ${tw`flex items-center justify-center`}
  border-color:${props => props.theme.colors.doveGray};
  color:${props => props.theme.colors.doveGray};
  border-width: 1px;
  border-style: dashed;
  font-size: 18px;
  cursor: pointer;
`

/********* menu *********/
export const DropdownWrapper = styled(ClickOutside)`
  ${tw`flex flex-row-reverse relative`}
  overflow:visible;
`

export const DropdownButton = styled.span`
  ${tw`inline-flex justify-center px-1 py-2 bg-white leading-5 focus:outline-none focus:border-blue-300 transition ease-in-out duration-150`}
  img {
    width: 6px;
    height: 19px;
    object-fit: contain;
  }
`

interface DropdownContainerProps {
  readonly visible: boolean
}

export const DropdownContainer = styled.div<DropdownContainerProps>`
  ${tw`origin-top-right absolute rounded-md right-0 shadow-lg`}
  display: ${props => (props.visible ? 'flex' : 'none')};
  width: 170px;
  >div{
      ${tw`rounded-md bg-white shadow-xs`}
  }
`

export const DropdownItem = styled.a`
  ${tw`block px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
  color: ${props => (props.color ? props.color : props.theme.colors.heavyMetal)};
  font-family: 'Lato';
  font-size: 15px;
`

export const DropdownSeparator = styled.div`
  ${tw`border-t border-gray-100`}
`
