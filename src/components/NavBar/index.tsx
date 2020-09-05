import React from 'react'
import { connect } from 'react-redux'
import Logo from '../../assets/img/logo.svg'
import { AppState } from '../../store'
import { User } from '../../store/auth/types'
import { loginUser } from '../../store/auth/actions'
import  { Wrapper, NavWrapper } from './styles'
import LoginBar from './LoginBar'


interface UserBarProps {
  user: User
}
const UserBar = ({user}: UserBarProps) => (
  <ul className="flex flex-row">
    <p>{user.firstName}</p>
  </ul>
)

interface NavBarProps {
  user: User | null
  loginUser: any
}

const NavBar = ({user, loginUser}: NavBarProps) => (
  <Wrapper>
    <NavWrapper>
        <div>
            <a href="#">
              <img className="hidden lg:block h-8 w-auto" src={Logo} alt="RemoteShiva logo"/>
            </a>
        </div>
        { user ? <UserBar user={user}/> : <LoginBar clickHandler={loginUser}/> }
    </NavWrapper>
  </Wrapper>
)

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, {loginUser})(NavBar)



