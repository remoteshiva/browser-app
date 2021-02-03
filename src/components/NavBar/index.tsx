import React, { useState, useContext } from 'react'
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
import { ThemeContext } from 'styled-components';

const MY_SHIVAS = 'My Shivas'
// const RESET_PASSWORD = 'Reset Password' TODO: implement
// const ACCOUNT_DETAILS = 'Account Details' TODO: implement
const FAQ = 'Help'
const LOG_OUT = 'Log Out'

interface UserBarProps {
  user: User
}

const UserBar = ({ user }: UserBarProps) => {
  const [isActive, setActive] = useState(false)
  const menu = [MY_SHIVAS, /* RESET_PASSWORD, */ FAQ, /*ACCOUNT_DETAILS,*/ LOG_OUT]
  const dispatch = useDispatch()
  const handleMenuClick = (item: string) => {
    if (item === MY_SHIVAS) {
      dispatch(push(Routes.MY_SHIVAS))
    } else if (item === FAQ) {
      // our Router, connected-react-router does not appear to support open links in a new tab, so I use window.open
      window.open(Routes.FAQ, '_blank');
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
const theme = useContext(ThemeContext);
  const { session } = useSelector((state: RootState) => state.auth)
  return (
    <Wrapper>
      <NavWrapper>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <a href="http://remoteshiva.org">
            <img className="hidden lg:block h-8 w-auto" src={Logo} alt="RemoteShiva logo" />
          </a>
          <div style={{ padding: '2px', borderRadius: '3px', fontSize: '10px', marginLeft: '4px', backgroundColor: theme.colors.blueChill, color: theme.colors.white }}>BETA</div>
        </div>
        {session ? <UserBar user={session.user} /> : <LoginBar />}
      </NavWrapper>
    </Wrapper>
  )
}

export default NavBar
