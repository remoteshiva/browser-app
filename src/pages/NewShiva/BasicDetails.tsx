import React, { useState } from 'react'
import { format, addDays } from 'date-fns'
import BasicDetailsArt from '../../assets/img/add-basic-details.svg'
import { Row, FixedColumn, FlexColumn } from '../../components/flexLayout'
import { StepProps, BasicDetailsProps, Steps } from './types'
import { StyledForm, ImageWrapper } from './styles'
import StepLayout from './Layout'

type ChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

const BasicDetails = ({ newShiva, submit, selectStep }: StepProps<BasicDetailsProps>) => {
  const dateFormat = 'yyyy-MM-dd'
  const { nameOfDeceased, startDate, endDate, message }: BasicDetailsProps = newShiva
  const [values, setValues] = useState({ nameOfDeceased, startDate, endDate, message })

  const handleInputChange = (event: ChangeEvent) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleDateInputChange = (event: ChangeEvent) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: new Date(value) })
  }

  return (
    <StepLayout
      title={'Add basic details'}
      step={1}
      submit={() => submit({ ...values, endDate: addDays(values.startDate, 6) }, Steps.VIDEO_CHAT_LINK)}
      submitText="Next: Add video link"
      stepperClickHandler={selectStep}
    >
      <div id="the-form">
        <Row>
          <FixedColumn width={327}>
            <StyledForm
              onSubmit={e => {
                e.preventDefault()
              }}
            >
              <label>
                Name of deceased
                <input
                  onChange={handleInputChange}
                  name="nameOfDeceased"
                  value={values.nameOfDeceased}
                  type="text"
                  required
                  className="appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3"
                />
              </label>
              <label>
                Start date of shiva
                <input
                  onChange={handleDateInputChange}
                  type="date"
                  name="startDate"
                  value={format(values.startDate, dateFormat)}
                  required
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                />
              </label>
              <label>
                Welcome message for visitors
                <textarea
                  onChange={handleInputChange}
                  name="message"
                  value={values.message}
                  placeholder="Type something here"
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                />
              </label>
            </StyledForm>
          </FixedColumn>
          <FlexColumn>
            <ImageWrapper>
              <img src={BasicDetailsArt} alt="Basic details" />
            </ImageWrapper>
          </FlexColumn>
        </Row>
      </div>
    </StepLayout>
  )
}

export default BasicDetails
