import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import styled from 'styled-components'
import tw from 'twin.macro'
import  { MenuItem } from './styles'

const LoginButton = styled.button`
  ${tw`text-white font-bold py-2 px-4 rounded`}
  background-color: ${props => props.theme.colors.richGold};
`

const LoginBar = () => {
  const dispatch=useDispatch()
  return (
    <ul className="flex flex-row">
      <MenuItem><a href='remoteshiva.org/how-it-works'>How it works</a></MenuItem>
      <MenuItem><a href='remoteshiva.org/how-it-works'>Example Shiva Page</a></MenuItem>
      <MenuItem><a href='remoteshiva.org/about'>About Us</a></MenuItem>
      <MenuItem><a href='remoteshiva.org/how-it-works'>Contact</a></MenuItem>
      <MenuItem><LoginButton onClick={() => dispatch(push('/login'))}>Log in</LoginButton></MenuItem>
    </ul>  
  )
}

export default LoginBar 