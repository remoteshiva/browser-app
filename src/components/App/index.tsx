import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { History } from 'history'
import { ConnectedRouter, push } from 'connected-react-router'
import styled from 'styled-components'
import { RootState, AppDispatch } from '../../store'
import { setInitialized } from '../../store/app/actions'
import { getAuthState } from '../../services/auth'
import { fetchMyShivas } from '../../services/shiva'
import Theme from '../Theme'
import GlobalStyle from '../GlobalStyle'
import NavBar from '../NavBar'
import Main from '../Main'
import Footer from '../Footer'
import ToastContainer from '../Toast'

interface Props {
  history: History
}
const PleaseWait = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.romance};
  font-family: 'Lora';
  font-size: 36px;
  color: ${props => props.theme.colors.doveGray};
`
const App = ({ history }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { initialized } = useSelector((state: RootState) => state.app)

  useEffect(() => {
    // upon startup , check authentication and navigate to provided url after
    const initApp = async () => {
      if (initialized) return
      const session = await dispatch(getAuthState())
      if (session !== undefined) {
        await dispatch(fetchMyShivas())
      }
      dispatch(setInitialized())
      dispatch(push(window.location.pathname))
    }
    initApp()
  }, [initialized, dispatch])

  return !initialized ? (
    <Theme>
      <PleaseWait>Loading, Please Wait...</PleaseWait>
    </Theme>
  ) : (
    <Theme>
      <GlobalStyle />
      <ConnectedRouter history={history}>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <Main />
          <Footer />
          <ToastContainer />
        </div>
      </ConnectedRouter>
    </Theme>
  )
}

export default App
