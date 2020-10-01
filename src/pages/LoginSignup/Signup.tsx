import React from 'react'
import styled from 'styled-components'
import { StyledForm, VerticalSpace, TextWithLine, LightButton, DarkButton } from './styles'

const Wrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 52px;
  color: ${props => props.theme.colors.heavyMetal};
`

const Signup = () => {
  return (
    <Wrapper>
      <p>Create an account in order to organize shivas. You do not need to create an account to attend a shiva.</p>
      <VerticalSpace height={30} />
      <LightButton>Sign up with Google</LightButton>
      <VerticalSpace height={33} />
      <TextWithLine>Or sign up with email</TextWithLine>
      <VerticalSpace height={33} />
      <StyledForm>
        <label>
          Name
          <input name="name" type="text" placeholder="First and last" required className="appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3" />
        </label>
        <label>
          Email address
          <input name="email" type="email" placeholder="example@mail.com" required className="appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="6-12 characters of any kind" required className="appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3" />
        </label>
        <VerticalSpace height={35} />
        <DarkButton>Create my account</DarkButton>
      </StyledForm>
    </Wrapper>
  )
}

export default Signup
