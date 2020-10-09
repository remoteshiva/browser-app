import React from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../store/auth/actions'
import { test_session } from '../../mock-data'
import NavBar from './'

export default {
  title: 'Navbar',
  component: NavBar,
}

export const Default = () => <NavBar />

export const WithUser = () => {
  // const dispatch = useDispatch()
  // dispatch(loginSuccess(test_session))
  return <NavBar />
}
