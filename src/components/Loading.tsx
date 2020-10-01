import React from 'react'
import styled from 'styled-components'
import Spinner from './Spinner'

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 50px;
  p {
    color: ${props => props.theme.colors.doveGray};
    margin-top: 20px;
    font-family: 'Lora';
    font-size: 34px;
  }
`

const Loading = () => (
  <Wrapper>
    <Spinner size={20} thickness={1.4} />
    <p>Loading, Please wait</p>
  </Wrapper>
)

export default Loading
