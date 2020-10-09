import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { AppState } from '../../store'
import { signupUser } from '../../services/auth'
import { DarkButton, LightButton } from '../../components/common'
import { StyledForm, VerticalSpace, TextWithLine } from './styles'

const Wrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 52px;
  color: ${props => props.theme.colors.heavyMetal};
  .error {
    color: ${props => props.theme.colors.cardinal};
  }
`

const Signup = () => {
  const dispatch = useDispatch()
  const [displayError, setDisplayError] = useState(false)
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const { loading, error } = useSelector((state: AppState) => state.auth)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
    setDisplayError(false)
  }
  const handleSignupWithCredentials = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDisplayError(true)
    dispatch(signupUser(values.name, values.email, values.password))
  }
  return (
    <Wrapper>
      <p>Create an account in order to organize shivas. You do not need to create an account to attend a shiva.</p>
      <VerticalSpace height={30} />
      <LightButton>Sign up with Google</LightButton>
      <VerticalSpace height={33} />
      <TextWithLine>Or sign up with email</TextWithLine>
      <VerticalSpace height={33} />
      <StyledForm onSubmit={handleSignupWithCredentials}>
        <label>
          Name
          <input
            name="name"
            type="text"
            value={values.name}
            onChange={handleInputChange}
            placeholder="First and last"
            required
            className="appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleInputChange}
            placeholder="example@mail.com"
            required
            className="appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3"
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleInputChange}
            placeholder="6-12 characters of any kind"
            required
            className="appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3"
          />
        </label>
        {error && displayError ? <div className="error">{error.message}</div> : null}
        <VerticalSpace height={35} />
        <DarkButton type="submit" disabled={loading}>
          Create my account
        </DarkButton>
      </StyledForm>
    </Wrapper>
  )
}

export default Signup
