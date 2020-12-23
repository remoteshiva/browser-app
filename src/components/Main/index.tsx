import React from 'react'
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as Routes from '../../routes'
import { RootState } from '../../store'
import { Session } from '../../store/auth/types'
import { MainWrapper } from './styles'
import LoginSignup, { Pages } from '../../pages/LoginSignup'
import Dashboard from '../../pages/Dashboard'
import NewShiva from '../../pages/NewShiva'
import EditShiva from '../../pages/Shiva'
import VisitorPage from '../../pages/Visitor'
import MournerPage from '../../pages/Mourner'
import NotFoundPage from '../../pages/NotFound'

interface privateRouteProps extends RouteProps {
  component: any
  session: Session | null
}

export const PrivateRoute = (props: privateRouteProps) => {
  if (!props.session) {
    const renderComponent = () => <Redirect to={{ pathname: Routes.LOGIN_PAGE }} />
    return <Route {...props} component={renderComponent} render={undefined} />
  } else {
    return <Route {...props} />
  }
}

const Main = () => {
  const { session } = useSelector((state: RootState) => state.auth)
  return (
    <MainWrapper>
      <Switch>
        <Route path={Routes.LOGIN_PAGE} exact render={() => <LoginSignup page={Pages.login} />} />
        <Route path={Routes.SIGNUP_PAGE} exact render={() => <LoginSignup page={Pages.signUp} />} />
        <PrivateRoute session={session} path={Routes.MY_SHIVAS} exact component={Dashboard} />
        <PrivateRoute session={session} path={Routes.NEW_SHIVA(':step?')} exact component={NewShiva} />
        <PrivateRoute session={session} path={Routes.SHIVA_PAGE(':id')} exact component={EditShiva} />
        <Route path={Routes.VISITOR_PAGE} component={VisitorPage} />
        <Route path={Routes.MOURNER_PAGE} component={MournerPage} />
        <Route path={Routes.NOT_FOUND} component={NotFoundPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </MainWrapper>
  )
}

export default Main
