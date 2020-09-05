import React, { ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Theme from '../Theme'
import NavBar from '../NavBar'
import Main from '../Main'


const App = () => (  
  <Theme>
      <Router>
        <NavBar/>
        <Main/>
      </Router>
  </Theme>
)

// <Main authenticated={authenticated} user={user}/>

export default App
