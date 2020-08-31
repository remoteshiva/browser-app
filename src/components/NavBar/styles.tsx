import styled from 'styled-components'
import tw from 'twin.macro'

export const Wrapper = styled.div`
  ${tw`p-5`}
  background-color:${props => props.theme.navbar.backgroundColor};
`

export const NavWrapper = styled.nav`
  ${tw`flex justify-between`}
`

export const MenuItem = styled.li`
  ${tw`pr-5 align-middle`}
  font-family: Lato;
  font-size: 15px;
  font-weight: normal;
  color: ${props => props.theme.navbar.menuItem.color};
  >a{
    ${tw`align-middle`}
    line-height: 37px;
  }
`