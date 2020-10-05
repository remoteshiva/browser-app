import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { AppState } from '../../store'
import { checkAuthentication } from '../../store/auth/actions'
import Theme from '../Theme'
import GlobalStyle from '../GlobalStyle'
import NavBar from '../../components/NavBar'
import Main from '../../components/Main'
import Footer from '../Footer'

interface Props {
  history: History
}

const App = ({ history }: Props) => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: AppState) => state.auth)
  useEffect(() => {
    // upon startup , check authentication and navigate to provided url after
    dispatch(checkAuthentication(window.location.pathname))
  }, [dispatch])
  return loading ? null : (
    <Theme>
      <GlobalStyle />
      <ConnectedRouter history={history}>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <Main />
          <Footer />
        </div>
      </ConnectedRouter>
    </Theme>
  )
}

export default App
