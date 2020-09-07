import React from 'react'
import styled from 'styled-components'
import StepLayout, { StepProps } from './Layout'

const StyledForm = styled.form`
  width: 327px;
  margin-top: 30px;
  label{
    color: ${props=> props.theme.colors.doveGray};
    font-size: 16px;
  }
  input{
    border-radius: 2px;
    border: solid 1px ${props=> props.theme.colors.sauvignon};
  }
`

const BasicDetails = (props: StepProps) => {
  return(
    <StepLayout
      title={'Add basic details'}
      step={1}
      withGraphics={true}
      submit={props.next}
      submitText='Next: Add video link'
    >
      <div id='the-form' style={{width: '327px'}}>
        <StyledForm>
          <label>
            Name of deceased
            <input type='text' className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3'/>
          </label>
          <label>
            Start date of shiva
            <input type='date' className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3'/>
          </label>
          <label>
            End date of shiva
            <input type='date' className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3'/>
          </label>
          <label>
            Welcome message for visitors
            <input type='text' className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3'/>
          </label>
        </StyledForm>
      </div>
    </StepLayout>
  )
}

export default BasicDetails