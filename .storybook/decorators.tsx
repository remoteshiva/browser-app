import React from 'react'
import { Provider } from 'react-redux'
import  Theme from '../src/components/Theme';
import configureStore from '../src/store'

const store = configureStore()

type rc = () => React.ReactNode

export const withTheme = (story:rc) => (<Theme>{story()}</Theme>)
export const withProvider = (story:rc) => (<Provider store={store}>{story()}</Provider>)
