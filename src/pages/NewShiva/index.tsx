import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router';
import moment from 'moment';
import styled from 'styled-components'
import { AppState } from '../../store'
import * as T from './types'
import { Shiva, createEmptyShiva } from '../../store/shiva/types'
import BackButton from './back'
import BasicDetails from './BasicDetails'
import VideoChatLink from './VideoChatLink'
import Mourners from './Mourners'
import VisitingHours from './VisitingHours'


const Wrapper = styled.div`
  padding-top: 24px;
  padding-left: 30px;
`

enum Steps{
  BASIC_DETAILS = 0,
  VIDEO_CHAT_LINK,
  MOURNERS,
  VISITS
}
interface MatchParams {
  step: string| undefined
}

interface NewShivaProps extends RouteComponentProps<MatchParams> {
}

interface NewShivaState extends Shiva {
  step: Steps
}

class NewShiva extends Component<NewShivaProps, NewShivaState> {
  private numOfSteps: number = Object.keys(Steps).length;
  constructor(props:NewShivaProps) {
    super(props)
    const step = Number(props.match.params.step)
    this.state = {
      ...createEmptyShiva(),
      step: !isNaN(step) ? step -1 : 0
    }
  }

  submitBasicDetails = ({nameOfDeceased, startDate, message}:T.BasicDetailsProps) => {
    this.setState({nameOfDeceased, startDate: moment(startDate), message, step: Steps.VIDEO_CHAT_LINK})
  }

  submitVideoChatLink = ({videoChatLink}:T.ChatProps) => {
    this.setState({step: Steps.MOURNERS})
  }

  submitMourners = ({mourners}:T.MournersProps) => {
    this.setState({step: Steps.VISITS})
  }

  submitShiva = () =>{
    this.setState({step: Steps.BASIC_DETAILS})
  }

  nextStep = () => {
    if(this.state.step < this.numOfSteps){
      this.setState({step: this.state.step + 1})
    }
  }
  createShiva = () => {
    this.setState({step:0, ...createEmptyShiva()})
  }
  renderStep = () => {
    switch(this.state.step){
      case Steps.BASIC_DETAILS:
        return (<BasicDetails submit={this.submitBasicDetails}/>)
      case Steps.VIDEO_CHAT_LINK:
        return (<VideoChatLink submit={this.submitVideoChatLink}/>)
      case Steps.MOURNERS:
        return (<Mourners submit={this.submitMourners}/>)
      case Steps.VISITS:
        return (<VisitingHours submit={this.submitShiva}/>)
    }
  }
  render (){
    return(
      <Wrapper>
        <BackButton/>
        {this.renderStep()}
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  shivaState: state.shiva,
})

export default connect(mapStateToProps, {})(NewShiva)