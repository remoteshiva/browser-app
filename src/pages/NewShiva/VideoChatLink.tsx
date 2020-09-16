import React, { useState } from 'react'
import { StepProps, ChatProps } from './types'
import { StyledForm } from './styles'
import StepLayout from './Layout'

const instrunctions = `Add a link to a videochatting room using a tool such as Zoom. See here for instructions on how to create a Zoom link.<br/> Please make sure to set the room so it is an ongoing “meeting.” This will enable visitors to come at any time without the meeting ever ending, which would require a new link. We recommend enabling the waiting room feature. If you prefer to link to a different type of video conference, you can do that instead.`

const VideoChatLink = ({submit}: StepProps<ChatProps>) => {
  const [values, setValues] = useState({videoChatLink: null})
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setValues({...values, [name]: value})
  } 
  return(
    <StepLayout
      title={'Add video chat link'}
      step={2}
      withGraphics={true}
      submit={() => submit({...values})}
      submitText='Next: Add mourners'
    >
      <div>{instrunctions}</div>
      <div id='the-form'>
        <StyledForm>
          <label>
            Link to your videochatting room
            <input onChange={handleInputChange} name={'videoChatLink'} type='url' className='appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3'/>
          </label>
        </StyledForm>
      </div>
    </StepLayout>
  )
}

export default VideoChatLink