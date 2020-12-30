import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Wrapper = styled.footer`
  ${tw`w-full text-center`}
  background-color:${props => props.theme.colors.heavyMetal};
  height: 100px;
  color: #fff;
`

const Footer = () => <Wrapper style={{ paddingTop: '2rem' }}>© RemoteShiva 2020-2021 <br/> This initiative was made possible through ROI Community's Coronavirus Response Micro Grant Program.</Wrapper>

export default Footer
