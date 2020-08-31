import React, { ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Theme from '../Theme'
import NavBar from '../NavBar'
import Main from '../Main'
import './app.css';


interface User {
  firstName: string
  lastName: string
}

interface AppProps {
  authenticated: boolean | null
  user: User | null
  children?: ReactNode
}

const App = ({authenticated, user}: AppProps) => {
  return(
    <Theme>
      {
        authenticated===null ? 
        <div>Please wait</div> :
        <Router>
            <div>
                <NavBar/>
                <Main/>
            </div>
        </Router>
      }
    </Theme>
  )
}

// <Main authenticated={authenticated} user={user}/>

export default App
