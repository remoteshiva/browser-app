import React from 'react'
import styled from 'styled-components'
import { StyledForm, VerticalSpace, LightButton, DarkButton } from './styles'

const Wrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 52px;
  color: ${props => props.theme.colors.heavyMetal};
  text-align: center;
  a {
    color: ${props => props.theme.colors.blueChill};
    text-decoration: underline;
  }
`

interface Props {
  loginUser: (username: string, password: string) => void
}
const Login = ({ loginUser }: Props) => {
  return (
    <Wrapper>
      <StyledForm>
        <label>
          Email address
          <input name="email" type="email" placeholder="example@mail.com" required className="appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="6-12 characters of any kind" required className="appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3" />
        </label>
      </StyledForm>
      <VerticalSpace height={35} />
      <DarkButton className="w-full" onClick={() => loginUser('ronb', 'password')}>
        Login
      </DarkButton>
      <VerticalSpace height={20} />
      <LightButton className="w-full" onClick={() => loginUser('ronb', 'password')}>
        Login with Google
      </LightButton>
      <VerticalSpace height={20} />
      <a href="#">I forgot my password</a>
    </Wrapper>
  )
}

export default Login
