import styled from 'styled-components'
import tw from 'twin.macro'

export const Wrapper = styled.header`
  ${tw`p-5`}
  background-color:${props => props.theme.colors.romance};
`

export const NavWrapper = styled.nav`
  ${tw`flex justify-between`}
`

export const MenuItem = styled.li`
  ${tw`pr-5 align-middle`}
  font-family: Lato;
  font-size: 15px;
  font-weight: normal;
  color: ${props => props.theme.colors.heavyMetal};
  > a {
    ${tw`align-middle`}
    line-height: 37px;
  }
`

export const UserBarWrapper = styled.ul`
  ${tw`flex flex-row`}
  color: ${props => props.theme.colors.richGold};
  font-size: 16px;
  img {
    width: 24px;
    height: 24px;
    margin-right:8px;
  }
`
