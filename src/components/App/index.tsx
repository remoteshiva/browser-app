import React from 'react'
import { History } from 'history'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Theme from '../Theme'
import GlobalStyle from '../GlobalStyle'
import NavBar from '../../containers/NavBar'
import Main from '../../containers/Main'
import Footer from '../Footer'

interface Props {
  history: History;
}

const App = ({history}:Props) => (  
  <Theme>
      <GlobalStyle/>
      <ConnectedRouter history={history}>
        <Router>
          <div className='min-h-screen flex flex-col'>
            <NavBar/>
            <Main/>
            <Footer/>
          </div>
        </Router>
      </ConnectedRouter>
  </Theme>
)

export default App
