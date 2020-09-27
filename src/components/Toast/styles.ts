import styled from 'styled-components'

const Container = styled.div`
  font-size: 14px;
  box-sizing: border-box;
  position: fixed;
`

export const TRContainer = styled(Container)`
  top: 12px;
  right: 12px;
  transition: transform .6s ease-in-out;
  animation: toast-in-right .7s;

`


export const BRContainer = styled(Container)`
  bottom: 12px;
  right: 12px;
  transition: transform .6s ease-in-out;
  animation: toast-in-right .7s;
`

export const TLContainer = styled(Container)`
  top: 12px;
  left: 12px;
  transition: transform .6s ease-in;
  animation: toast-in-left .7s;
`

export const BLContainer = styled(Container)`
  bottom: 12px;
  left: 12px;
  transition: transform .6s ease-in;
  animation: toast-in-left .7s;
`