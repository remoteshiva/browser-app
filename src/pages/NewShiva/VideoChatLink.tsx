import React, { useState } from 'react'
import { Row, FixedColumn, FlexColumn } from '../../components/flexLayout'
import BasicDetailsArt from '../../assets/img/add-basic-details.svg'
import { StepProps, ChatProps, Steps } from './types'
import { StyledForm, ImageWrapper } from './styles'
import StepLayout from './Layout'

const instructionsLink = 'http://remoteshiva.org'

const VideoChatLink = ({newShiva, submit, selectStep}: StepProps<ChatProps>) => {
  const [values, setValues] = useState({videoChatLink: newShiva.videoLink})
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setValues({...values, [name]: value})
  } 
  return(
    <StepLayout
      title={'Add video chat link'}
      step={2}
      submit={() => submit({...values}, Steps.MOURNERS)}
      submitText='Next: Add mourners'
      stepperClickHandler={selectStep}
    >
      <Row>
        <FixedColumn width={360}>
          <p>Add a link to a videochatting room using a tool such as Zoom.&nbsp;
            <a href={instructionsLink} target="_blank" rel="noopener noreferrer">
              See here for instructions on how to create a Zoom link.
            </a>
          </p>
          <br/>
          <p>Please make sure to set the room so it is an ongoing “meeting.” This will enable visitors to come at any time without the meeting ever ending, which would require a new link.</p>
          <br/>
          <p>We recommend enabling the waiting room feature. If you prefer to link to a different type of video conference, you can do that instead.</p>
          <StyledForm>
            <label>
              Link to your videochatting room
              <input onChange={handleInputChange} name={'videoChatLink'} placeholder='Example: zoom.us/10283' type='url' className='appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3'/>
            </label>
          </StyledForm>
        </FixedColumn>
        <FlexColumn>
          <ImageWrapper><img src={BasicDetailsArt} alt='Basic details'/></ImageWrapper>
        </FlexColumn>
      </Row>
    </StepLayout>
  )
}

export default VideoChatLink