import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { loginUser } from '../../store/auth/actions'
import Graphics from '../../assets/img/illustration-for-tips.svg'
import { Row, FixedColumn, FlexColumn } from '../../components/flexLayout'
import { UXWrapper, GraphicsWrapper, TabsWrapper, Tab } from './styles'
import Signup from './Signup'
import Login from './Login'

export enum Pages {
	login='login',
	signUp='signup'
}
interface Props {
	page: Pages
}


const LoginSignup = ({page}: Props) => {
  const dispatch = useDispatch()
	const isPage = (p: Pages) => {
		return page === p;
  }
  const handleSelectTab =(p: Pages) => {
    dispatch(push(`/${p.toString()}`))
  }
  const handleLogin = (username: string, password: string) => {
    dispatch(loginUser(username, password))
  }
  return(
    <div style={{minHeight: '870px'}}>
		<Row>
			<FlexColumn>
				<GraphicsWrapper>
					<img src={Graphics} alt='video conference'/>
				</GraphicsWrapper>
			</FlexColumn>
			<FixedColumn width={533}>
				<UXWrapper>
					<Row>
						<TabsWrapper>
							<Tab active={isPage(Pages.signUp)} onClick={()=> handleSelectTab(Pages.signUp)} >Sign up</Tab>
							<Tab active={isPage(Pages.login)} onClick={()=> handleSelectTab(Pages.login)}>Login</Tab>
						</TabsWrapper>
					</Row>
					<Row>
						{ page === Pages.signUp ? <Signup/> : <Login loginUser={handleLogin}/>}
					</Row>
				</UXWrapper>
			</FixedColumn>
	  </Row>
    </div >
  )
}

export default LoginSignup