import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router';
import { push } from 'connected-react-router'
import styled from 'styled-components'
import { AppState } from '../../store'
import * as T from './types'
import { Shiva, createEmptyShiva } from '../../store/shiva/types'
import Toast, { ToastModel, Position, getRandomId } from '../../components/Toast'
import BackButton from './back'
import BasicDetails from './BasicDetails'
import VideoChatLink from './VideoChatLink'
import Mourners from './Mourners'
import VisitingHours from './VisitingHours'
import CheckIcon from '../../assets/img/checkbox.svg'


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
  toasts: ToastModel[]
}

class NewShiva extends Component<NewShivaProps, NewShivaState> {
  private numOfSteps: number = Object.keys(T.Steps).length;
  constructor(props:NewShivaProps) {
    super(props)
    const step = Number(props.match.params.step)
    this.state = {
      ...createEmptyShiva(),
      step: !isNaN(step) ? step -1 : 0,
      toasts: []
    }
  }

  submitStepData = <T extends {}>(data: T, nextStep: T.Steps) => {
    this.setState({...this.state, ...data, step: nextStep})
  }

  addNotification = (toast: ToastModel) => {
    this.setState({toasts: [...this.state.toasts, toast]})
  }

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
            addNotification={this.addNotification}
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
        <Toast toasts={this.state.toasts} autoDelete={true} position={Position.br}  />
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