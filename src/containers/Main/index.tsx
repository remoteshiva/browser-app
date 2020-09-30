import React from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchShivas } from '../../store/shiva/actions'
import { AppState } from '../../store'
import { Session } from '../../store/auth/types'
import { MainWrapper } from './styles'
import LoginSignup, { Pages } from '../../pages/LoginSignup'
import Dashboard from '../../pages/Dashboard'
import NewShiva from '../../pages/NewShiva'
import EditShiva from '../../pages/Shiva'
import VisitorPage from '../../pages/Visitor'
import MournerPage from '../../pages/Mourner'
import NotFoundPage from '../../pages/NotFound'


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
        <Route path='/login' exact render={() => (<LoginSignup page={Pages.login}/>) }/>
        <Route path='/signup' exact render={() => (<LoginSignup page={Pages.signUp}/>) }/>
        <PrivateRoute 
          session={session}
          path='/'
          exact component={ Dashboard }
        />
        <PrivateRoute 
          session={session}
          path='/newshiva/:step?'
           exact component={ NewShiva }
        />
        <PrivateRoute 
          session={session}
          path='/shiva/:id'
           exact component={ EditShiva }
        />
        <Route path='/v/:key' component={VisitorPage}/>
        <Route path='/m/:key' component={MournerPage}/>
        <Route path="/404" component={NotFoundPage} />
        <Route  component={NotFoundPage} />
      </Switch>
    </MainWrapper>
    )
}

const mapStateToProps = (state: AppState) => ({
    session: state.auth.session,
  })
  
export default connect(mapStateToProps, {fetchShivas})(Main)
  
  