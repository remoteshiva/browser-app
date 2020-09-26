import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router';
import { push } from 'connected-react-router'
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
  padding: 24px 30px;
`
interface MatchParams {
  step: string| undefined
}

interface NewShivaProps extends RouteComponentProps<MatchParams> {
  push: (path:string)=> void
}

interface NewShivaState extends Shiva {
  step: T.Steps
}

class NewShiva extends Component<NewShivaProps, NewShivaState> {
  private numOfSteps: number = Object.keys(T.Steps).length;
  constructor(props:NewShivaProps) {
    super(props)
    const step = Number(props.match.params.step)
    this.state = {
      ...createEmptyShiva(),
      step: !isNaN(step) ? step -1 : 0
    }
  }

  submitStepData = <T extends {}>(data: T, nextStep: T.Steps) => {
    this.setState({...this.state, ...data, step: nextStep})
  }

  /*
  submitBasicDetails = ({nameOfDeceased, startDate, message}:T.BasicDetailsProps) => {
    this.setState({nameOfDeceased, startDate: moment(startDate), message}) //, step: Steps.VIDEO_CHAT_LINK})
  }

  submitVideoChatLink = ({videoChatLink}:T.ChatProps) => {
    this.setState({step: Steps.MOURNERS})
  }

  submitMourners = ({mourners, mournerKey}:T.MournersProps) => {
    this.setState({mourners, mournerKey, step: Steps.VISITS})
  }

  submitVisits = ({visits}:T.VisitingProps) => {
    this.setState({visits})
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
  }*/

  selectStep = (step: number) => {
    this.setState({step: step-1})
    this.props.push(`/newshiva/${step}`)
  }

  renderStep = () => {
    switch(this.state.step){
      case T.Steps.BASIC_DETAILS:
        return (
          <BasicDetails
            newShiva={this.state}
            submit={(data:T.BasicDetailsProps, nextStep:T.Steps) => (this.submitStepData<T.BasicDetailsProps>(data, nextStep))}
            selectStep={this.selectStep}
          />
        )
      case T.Steps.VIDEO_CHAT_LINK:
        return (
          <VideoChatLink
            newShiva={this.state}
            submit={(data:T.ChatProps, nextStep:T.Steps) => (this.submitStepData<T.ChatProps>(data, nextStep))}
            selectStep={this.selectStep}
          />
        )
      case T.Steps.MOURNERS:
        return (
          <Mourners
            newShiva={this.state}
            submit={(data:T.MournersProps, nextStep:T.Steps) => (this.submitStepData<T.MournersProps>(data, nextStep))}
            selectStep={this.selectStep}
          />
        )
      case T.Steps.VISITS:
        return (
          <VisitingHours 
            newShiva={this.state}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            submit={(data:T.VisitingProps, nextStep:T.Steps) => (this.submitStepData<T.VisitingProps>(data, nextStep))}
            selectStep={this.selectStep}
          />
        )
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  push: (path: string) => dispatch(push(path)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewShiva)