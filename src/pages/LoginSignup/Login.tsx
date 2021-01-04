import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import styled from 'styled-components'
import * as Routes from '../../routes'
import { DarkButton, LightButton } from '../../components/common'
import { StyledForm, VerticalSpace } from './styles'
import { RootState, AppDispatch } from '../../store'
import { loginWithCredentials, loginWithGoogle } from '../../services/auth'
import { fetchMyShivas } from '../../services/shiva'

const Wrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 52px;
  color: ${props => props.theme.colors.heavyMetal};
  text-align: center;
  a {
    color: ${props => props.theme.colors.blueChill};
    text-decoration: underline;
  }
  .error {
    color: ${props => props.theme.colors.cardinal};
  }
`

const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [displayError, setDisplayError] = useState(false)
  const [values, setValues] = useState({ email: '', password: '' })
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
    setDisplayError(false)
  }
  const onLoginWithCredentials = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDisplayError(true)
    const session = await dispatch(loginWithCredentials(values.email, values.password))
    if (session !== undefined) {
      console.log('SESSION')
      console.log(session)
      await dispatch(fetchMyShivas())
      dispatch(push(Routes.MY_SHIVAS))

    }
  }
  return (
    <Wrapper>
      <StyledForm onSubmit={onLoginWithCredentials}>
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
        <DarkButton className="w-full" type="submit" disabled={loading}>
          Login
        </DarkButton>
      </StyledForm>
      <VerticalSpace height={20} />
      <LightButton className="w-full" onClick={() => dispatch(loginWithGoogle())}>
        Login with Google
      </LightButton>
      <VerticalSpace height={20} />
      <a href="#">I forgot my password</a>
    </Wrapper>
  )
}

export default Login
