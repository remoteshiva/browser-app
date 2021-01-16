import React, {useState} from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Visit, Visitor as VisitorModel } from '../../store/shiva/types'
import { ApproveButton, VerticalSpace } from '../../components/common'
import TimePicker from '../TimePicker'

const Wrapper = styled.div`
  font-family: 'Lato';
  width: 360px;
  border-radius: 2px;
  box-shadow: 0 2px 15px 0 rgba(123, 119, 108, 0.37);
  text-align: left;
  padding: 20px;
  .title{
    font-family: 'Lora';
    font-size: 24px;
    font-weight: 500;
    color: ${props=>props.theme.colors.heavyMetal};
  }
  .timeslot{
    font-family: 'Lato';
    font-size: 16px;
    color: ${props=>props.theme.colors.heavyMetal};
  }
  form{
    text-align: left;
    label {
      color: ${props => props.theme.colors.doveGray};
      font-size: 16px;
    }
    input {
      border-radius: 2px;
      border: solid 1px ${props => props.theme.colors.sauvignonLight};
    }
  }
`

interface Props extends Visit {
  day: Date
  onSubmitVisitor: (visitor:VisitorModel)=> void
}
const Visitor = ({startTime, endTime, day, onSubmitVisitor}: Props) => {
  const [values, setValues] = useState({ name: '', email: '' })
  const [time, setTime] = useState(startTime)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleTimeChange = (time: Date) => {
    setTime(time)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault()
    onSubmitVisitor({
      name: values.name,
      email: values.email,
      time,
    })
  }

  return<Wrapper>
    <div className='title'>Visit {format(day, 'EEEE, MMMM do')}</div>
    <div className='timeslot'>{format(startTime, 'p')} - {format(endTime, 'p')}</div>
    <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            type="text"
            value={values.name}
            onChange={handleInputChange}
            placeholder="First and last"
            required
            className="appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3"
          />
        </label>
        <label>
          Email (for notifications)
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleInputChange}
            placeholder="example@mail.com"
            required
            className="appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3"
          />
        </label>
        <label>
          When will you visit?
          <TimePicker startTime={startTime} endTime={endTime} onChange={handleTimeChange} />
        </label>
        <VerticalSpace height={20}/>
        <ApproveButton  style={{width: '100%'}} type="submit">
          Save my visit
        </ApproveButton>
      </form>
  </Wrapper>
}

export default Visitor
