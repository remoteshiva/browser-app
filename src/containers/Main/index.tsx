import React from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchShivas } from '../../store/shiva/actions'
import { AppState } from '../../store'
import { Session } from '../../store/auth/types'
import { MainWrapper } from './styles'
import Home from '../../pages/Home'
import Login from '../../pages/login'
import Dashboard from '../../pages/Dashboard'
import NewShiva from '../../pages/NewShiva'

interface privateRouteProps extends RouteProps{
    component: any
    session: Session | null
}

export const PrivateRoute = (props: privateRouteProps) => {
  
    if (!props.session) {
        const renderComponent = () => <Redirect to={{ pathname: '/login' }} />;
        return <Route {...props} component={renderComponent} render={undefined} />;
    } else {
      return <Route {...props} />;
    }
}

interface Props {
    session: Session | null
}

const Main = ({session}: Props) => {
  return(
    <MainWrapper> 
      <Switch>
        <Route path="/" exact component={ Home }/>
        <Route path="/login" exact component={ Login }/>
        <PrivateRoute 
          session={session}
          path="/dashboard"
          exact component={ Dashboard }
        />
        <PrivateRoute 
          session={session}
          path='/newshiva'
           exact component={ NewShiva }
        />
        </Switch>
        </MainWrapper>
    )
}

const mapStateToProps = (state: AppState) => ({
    session: state.auth.session,
  })
  
export default connect(mapStateToProps, {fetchShivas})(Main)
  
  