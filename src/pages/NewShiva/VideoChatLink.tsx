import React, { useState } from 'react'
import { Row, FixedColumn, FlexColumn } from '../../components/flexLayout'
import BasicDetailsArt from '../../assets/img/add-basic-details.svg'
import { isValidURL } from '../../utils'
import { StepProps, ChatProps, Steps } from './types'
import { StyledForm, ImageWrapper } from './styles'
import StepLayout from './Layout'

// TODO: Implement
// const instructionsLink = 'http://remoteshiva.org'

const VideoChatLink = ({newShiva, submit, selectStep}: StepProps<ChatProps>) => {
  const [values, setValues] = useState({videoLink: newShiva.videoLink?.toString() || ''})
  const [error, setError] = useState('')
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setValues({...values, [name]: value})
    setError('')
  }
  const handleSubmit = () => {
    if(values.videoLink === '')
      submit({videoLink: null}, Steps.MOURNERS)
    else if (!isValidURL(values.videoLink)) {
      setError('Invalid video chat link')
    } else submit({videoLink: new URL(values.videoLink)}, Steps.MOURNERS)

  }
  return(
    <StepLayout
      title={'Add video chat link'}
      step={2}
      submit={handleSubmit}
      submitText='Next: Add mourners'
      stepperClickHandler={selectStep}
    >
      <Row>
        <FixedColumn width={360}>
          <p>Add a link to the video call room, like Zoom, that you’ll use for the shiva. Make sure to set up the video call so that you can use the same link across all the days and times of the shiva. <a href='https://blog.remoteshiva.org/index.php/setup-your-shiva-video-room/'>See here for more information</a> on different video platform options you can use. Keep in mind a Zoom Pro account is needed to have one ongoing video call with the same link, whereas Google Meet lets you do this for free. Link to your video chatting room:</p>
          <StyledForm>
            <label>
              Link to your videochatting room
              <input onChange={handleInputChange} name={'videoLink'} placeholder='Example: zoom.us/10283' type='url' autoComplete='off' className='appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3'/>
            </label>
            <div className="error">{error}</div>
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
