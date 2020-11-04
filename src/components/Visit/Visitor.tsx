import React, {useState} from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Visit, Visitor as VisitorModel } from '../../store/shiva/types'
import { ApproveButton } from '../../components/common'

const Wrapper = styled.div`
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
  onSubmitVisitor: (visitor:VisitorModel)=> void
}
const Visitor = ({startTime, onSubmitVisitor}: Props) => {
  const [values, setValues] = useState({ name: '', email: '' })
  const [time, setTime] = useState(format(startTime, 'p'))
  const [timezone, setTimezone] = useState('EST')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault()
    onSubmitVisitor({
      name: values.name,
      email: values.email,
      time,
      timezone,
    })
  }

  return<Wrapper>
    <div className='title'>Visit {format(startTime, 'EEEE, MMMM Qo')}</div>
    <div className='timeslot'>{format(startTime, 'p')}</div>
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
          Email (for confirmation and to edit visit)
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
          Around what time do you plan to stop by?
          <input
            name="time"
            type="text"
            value={time}
            onChange={()=>{}}
            required
            className="appearance-none bg-grey-lighter rounded py-3 px-4 mb-3 mr-2"
            style={{width: '48%'}}
          />
          <input
            name="timezone"
            type="text"
            value={timezone}
            onChange={()=>{}}
            required
            className="appearance-none bg-grey-lighter rounded py-3 px-4 mb-3"
            style={{width: '48%'}}
          />
        </label>
        <ApproveButton  style={{width: '100%'}} type="submit">
          Save my visit
        </ApproveButton>
      </form>
  </Wrapper>
}

export default Visitor
