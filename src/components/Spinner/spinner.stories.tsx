import React from 'react'
import Spinner from './'

export default {
  title: 'Spinner',
  component: Spinner,
}

export const Default = () => <Spinner size={20} thickness={1.4} />

export const WithBackgroundAndText = () => (
  <div
    style={{
      backgroundColor: '#fdfaf9',
      height: '30em',
      textAlign: 'center',
    }}
  >
    <Spinner size={20} thickness={1.4} />
  </div>
)
