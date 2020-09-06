import React from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchShivas } from '../../store/shiva/actions'
import { AppState } from '../../store'
import { User } from '../../store/auth/types'
import { MainWrapper } from './styles'
import Home from '../../pages/Home'
import Login from '../../pages/login'
import Dashboard from '../../pages/Dashboard'
import NewShiva from '../../pages/NewShiva'

interface privateRouteProps extends RouteProps{
    component: any
    user: User | null
}

export const PrivateRoute = (props: privateRouteProps) => {
  
    if (!props.user) {
        const renderComponent = () => <Redirect to={{ pathname: '/login' }} />;
        return <Route {...props} component={renderComponent} render={undefined} />;
    } else {
      return <Route {...props} />;
    }
}

interface Props {
    user: User | null
}

const Main = ({user}: Props) => {
  return(
    <MainWrapper> 
      <Switch>
        <Route path="/" exact component={ Home }/>
        <Route path="/login" exact component={ Login }/>
        <PrivateRoute 
          user={user}
          path="/dashboard"
          exact component={ Dashboard }
        />
        <PrivateRoute 
          user={user}
          path='/newshiva'
           exact component={ NewShiva }
        />
        </Switch>
        </MainWrapper>
    )
}

const mapStateToProps = (state: AppState) => ({
    user: state.auth.user,
  })
  
export default connect(mapStateToProps, {fetchShivas})(Main)
  
  