import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import styled from 'styled-components'
import BackArrowIcon from '../../assets/img/back-arrow.svg'

const BackArrow = styled.img`
  width: 18px;
  height: 15px;
  margin-right: 9px;
  object-fit: contain;
  display: inline-block;
`

const BackWrapper = styled.div`
  margin-bottom: 40px;
  cursor: pointer !important;
`

const Back = () => {
  const dispatch = useDispatch()
  return(
    <BackWrapper onClick={() => dispatch(push('/dashboard'))}>
      <div>
        <BackArrow src={BackArrowIcon}/>
        Back to my shivas
      </div>
    </BackWrapper>
  )
}

export default Back