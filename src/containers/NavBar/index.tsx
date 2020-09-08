import React from 'react'
import { connect } from 'react-redux'
import Logo from '../../assets/img/logo.svg'
import Avatar from '../../assets/img/avatar.svg'
import { AppState } from '../../store'
import { Session, User } from '../../store/auth/types'
import { loginUser } from '../../store/auth/actions'
import  { Wrapper, NavWrapper, UserBarWrapper } from './styles'
import LoginBar from './LoginBar'


interface UserBarProps {
  user: User
}
const UserBar = ({user}: UserBarProps) => (
  <UserBarWrapper>
    <img src={Avatar} alt="Avatar"/>
    <span>Hi, {user.firstName}</span>
  </UserBarWrapper>
)

interface NavBarProps {
  session: Session | null
  loginUser: any
}

const NavBar = ({session, loginUser}: NavBarProps) => (
  <Wrapper>
    <NavWrapper>
        <div>
            <a href="#">
              <img className="hidden lg:block h-8 w-auto" src={Logo} alt="RemoteShiva logo"/>
            </a>
        </div>
        { session ? <UserBar user={session.user}/> : <LoginBar clickHandler={loginUser}/> }
    </NavWrapper>
  </Wrapper>
)

const mapStateToProps = (state: AppState) => ({
  session: state.auth.session,
})

export default connect(mapStateToProps, {loginUser})(NavBar)



