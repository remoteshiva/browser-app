import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './assets/styles/styles.css';
import App from './components/App';
import GlobalStyle from './components/GlobalStyle'
import * as serviceWorker from './serviceWorker';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <GlobalStyle/>
      <App authenticated={true} user={null}/>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
