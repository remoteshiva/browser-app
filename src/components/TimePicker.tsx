import React from 'react'
import styled from 'styled-components'
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns'
import tw from 'twin.macro'


const Wrapper = styled.div`
  display: flex;
  font-size: 16px;
  ${tw`mt-2 p-3 w-full bg-white`}
`

interface Props {
  startTime: Date
  endTime: Date
  onChange: (time: Date)=> void
}
const TimePicker = ({startTime, endTime, onChange}: Props) => {
  const hours = Array.from({length: getHours(endTime)-getHours(startTime) + 1}, (_, i) => i + getHours(startTime))
  const minutes = ['00', '15', '30', '45']

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if(event.target.name === 'hours'){
      onChange(setHours(startTime, parseInt(event.target.value)))
    } else if(event.target.name==='minutes'){
      onChange(setMinutes(startTime, parseInt(event.target.value)))
    }
  }
  return <Wrapper>
    <select
      name='hours'
      className='bg-transparent appearance-none outline-none'
      onChange={handleChange}
    >
      { hours.map(h => <option value={h}>{h}</option>) }
    </select>
    <span className="mr-3">:</span>
    <select
      name='minutes'
      defaultValue={getMinutes(startTime)}
      className='bg-transparent appearance-none outline-none mr-4'
      onChange={handleChange}
    >
      { minutes.map(m => <option value={m}>{m}</option>) }
    </select>
    {/* <select name='ampm' className='bg-transparent appearance-none outline-none'>
      <option value="am">AM</option>
      <option value="pm">PM</option>
    </select> */}
  </Wrapper>
}

export default TimePicker
