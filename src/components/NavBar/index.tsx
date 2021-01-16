import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import * as Routes from '../../routes'
import Logo from '../../assets/img/logo.svg'
import Avatar from '../../assets/img/avatar.svg'
import { RootState } from '../../store'
import { logoutUser } from '../../services/auth'
import { User } from '../../store/auth/types'
import { Wrapper, NavWrapper, UserBarWrapper } from './styles'
import LoginBar from './LoginBar'

const MY_SHIVAS = 'My Shivas'
const RESET_PASSWORD = 'Reset Password'
// const ACCOUNT_DETAILS = 'Account Details' TODO: implement
const FAQ = 'Help'
const LOG_OUT = 'Log Out'

interface UserBarProps {
  user: User
}
const UserBar = ({ user }: UserBarProps) => {
  const [isActive, setActive] = useState(false)
  const menu = [MY_SHIVAS, RESET_PASSWORD, FAQ, /*ACCOUNT_DETAILS,*/ LOG_OUT]
  const dispatch = useDispatch()
  const handleMenuClick = (item: string) => {
    if (item === MY_SHIVAS) {
      dispatch(push(Routes.MY_SHIVAS))
    } else if (item === FAQ) {
      dispatch(push(Routes.FAQ))
    } else if (item === LOG_OUT) {
      dispatch(logoutUser())
    }
    setActive(false)
  }
  return (
    <UserBarWrapper onClickOutside={() => setActive(false)}>
      <button onClick={() => setActive(!isActive)}>
        <img src={Avatar} alt="Avatar" />
        Hi, {user.displayName}
      </button>
      <ul className={`origin-top-right absolute right-2 mt-6 w-30 rounded-md shadow-lg ${isActive ? 'block' : 'hidden'}`}>
        {menu.map(item => (
          <li key={item} onClick={() => handleMenuClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </UserBarWrapper>
  )
}

const NavBar = () => {
  const { session } = useSelector((state: RootState) => state.auth)
  return (
    <Wrapper>
      <NavWrapper>
        <div>
          <a href="http://remoteshiva.org">
            <img className="hidden lg:block h-8 w-auto" src={Logo} alt="RemoteShiva logo" />
          </a>
        </div>
        {session ? <UserBar user={session.user} /> : <LoginBar />}
      </NavWrapper>
    </Wrapper>
  )
}

export default NavBar
