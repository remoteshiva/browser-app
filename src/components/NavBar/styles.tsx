import styled from 'styled-components'
import tw from 'twin.macro'
import { ClickOutside } from '../../components/ClickOutside'

export const Wrapper = styled.header`
  ${tw`p-5`}
  background-color:${props => props.theme.colors.romance};
`

export const NavWrapper = styled.nav`
  ${tw`flex justify-between`}
`

export const MenuItem = styled.li`
  /* ${tw`pr-5 align-middle`} */
  display: flex;
  align-items: center;
  font-family: Lato;
  font-size: 15px;
  font-weight: normal;
  color: ${props => props.theme.colors.heavyMetal};
  padding-right: 12px;
  padding-left: 12px;
  > a {
    /* ${tw`align-middle`} */
    line-height: 37px;
  }
  border-bottom: 2px solid transparent;
    transition: all 150ms ease-in-out 0ms;
    &:hover {
      border-bottom: 2px solid ${props => props.theme.colors.richGold};
    }
`

export const UserBarWrapper = styled(ClickOutside)`
  ${tw`flex flex-row`}
  color: ${props => props.theme.colors.richGold};
  font-size: 16px;
  z-index: 30;
  button{
    padding: 2px 10px;
    :active{
      border-radius: 8px;
      box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.12);
      background-color: #f4eee8;
    }
  }
  img {
    width: 24px;
    height: 24px;
    margin-right:8px;
  }
  li{
    padding: 0.5rem 1rem;
    background-color: white;
    font-size: 15px;
    color: ${props => props.theme.colors.heavyMetal};
    cursor: pointer;
    :hover{
      background-color: #F8FAFC;
    }
    :last-child{
      color: ${props => props.theme.colors.venetianRed};
    }
  }
`
