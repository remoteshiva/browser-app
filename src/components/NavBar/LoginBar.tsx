import React, { ReactNode } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import  { MenuItem } from './styles'

const LoginButtonWrapper = styled.button`
  ${tw`text-white font-bold py-2 px-4 rounded`}
  background-color: #924623;
`

interface LoginButtonProps {
  onClick?: () => void
  children: ReactNode
}

const LoginButton = ({onClick, children}: LoginButtonProps) => (
  <LoginButtonWrapper type="button" onClick={onClick}>{children}</LoginButtonWrapper>
)

interface Props {
  clickHandler: () => void
}

const LoginBar = ({clickHandler}: Props) => (
  <ul className="flex flex-row">
    <MenuItem><a>How it works</a></MenuItem>
    <MenuItem><a>Example Shiva Page</a></MenuItem>
    <MenuItem><a>About Us</a></MenuItem>
    <MenuItem><a>Contact</a></MenuItem>
    <MenuItem><LoginButton onClick={clickHandler}>Log in</LoginButton></MenuItem>
  </ul>  
)

export default LoginBar 