import React, { useState } from 'react'
import moment from 'moment'
import { StepProps, BasicDetailsProps } from './types'
import { StyledForm } from './styles'
import StepLayout from './Layout'


const BasicDetails = ({submit}: StepProps<BasicDetailsProps>) => {
  const dateFormat = 'yyyy-MM-DD'
  const [values, setValues] = useState({nameOfDeceased:'', startDate: moment().format(dateFormat), message: ''})

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setValues({...values, [name]: value})
  } 
  const handleTextAreaChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = event.target
    setValues({...values, [name]: value})
  } 
  return(
    <StepLayout
      title={'Add basic details'}
      step={1}
      withGraphics={true}
      submit={() => submit({...values})}
      submitText='Next: Add video link'
    >
      <div id='the-form'>
        <StyledForm>
          <label>
            Name of deceased
            <input onChange={handleInputChange} name='nameOfDeceased' value={values.nameOfDeceased} type='text' required className='appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3'/>
          </label>
          <label>
            Start date of shiva
            <input onChange={handleInputChange} type='date' name='startDate' value={values.startDate} placeholder={dateFormat} required className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3'/>
          </label>
          <label>
            Welcome message for visitors
            <textarea onChange={handleTextAreaChange} name='message' value={values.message} placeholder='Type something here' className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3'/>
          </label>
        </StyledForm>
      </div>
    </StepLayout>
  )
}

export default BasicDetails

