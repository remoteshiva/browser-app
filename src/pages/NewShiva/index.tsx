import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { withRouter } from "react-router";
import { push } from 'connected-react-router'
import styled from 'styled-components'
import BackArrowIcon from '../../assets/img/back-arrow.svg'
import { AppState } from '../../store'

const Wrapper = styled.div`
  padding-top: 30px;
  padding-left: 30px;
`

const BackArrow = styled.img`
  width: 18px;
  height: 15px;
  margin-right: 9px;
  object-fit: contain;
  display: inline-block;
`

const Back = () => {
  const dispatch = useDispatch()
  return(
    <div onClick={() => dispatch(push('/dashboard'))}>
      <BackArrow src={BackArrowIcon}/>
      Back to my shivas
    </div>
  )
}

const NewShiva = () => {
  return(
    <Wrapper>
      <Back/>
    </Wrapper>
  )
}

const mapStateToProps = (state: AppState) => ({
  shivaState: state.shiva,
})

export default withRouter(connect(mapStateToProps, {})(NewShiva))