import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Wrapper = styled.footer`
  ${tw`w-full text-center`}
  background-color:${props => props.theme.colors.heavyMetal};
  height: 100px;
  color: #fff;
`

const Footer = () => <Wrapper>©RemoteShiva 2020</Wrapper>

export default Footer
