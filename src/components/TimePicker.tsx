import React, { useState } from 'react'
import styled from 'styled-components';
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import tw from 'twin.macro';

const Wrapper = styled.div`
  display: flex;
  font-size: 16px;
  ${tw`mt-2 p-3 w-full bg-white`}
`;

interface Props {
  startTime: Date;
  endTime: Date;
  onChange: (time: Date) => void;
}
const TimePicker = ({ startTime, endTime, onChange }: Props) => {
  console.log(`TimePicker startTime ${startTime} endTime ${endTime} `)
  const startHour = getHours(startTime);
  const endHour = getHours(endTime);

  let visitHours = Array.from(
    { length: Math.abs(endHour - startHour) + 1 },
    (_, i) => i + startHour
  );
  const allMinutes = ['00', '15', '30', '45'];
  // case 1: you can't drop in at the end of a shiva! (ex. 8am-10am visiting hours, 10am isn't a valid visit time)
  if (getMinutes(endTime) === 0) {
    visitHours.pop()
  }
  // case 2: you can't show up before visiting hours start (ex. 8:30am to 10am visiting hours, 8:00am and 8:15am aren't valid, 8:30 and 8:45 are)
  const [visitMinutes, setVisitMinutes] = useState(allMinutes.filter(m => parseInt(m) >= getMinutes(startTime)));
  const [visitHour, setVisitHour] = useState(visitHours[0]);
  const [visitMinute, setVisitMinute] = useState(visitMinutes[0]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name === 'hours') {
      const visitTime = setHours(startTime, parseInt(event.target.value));
      let newVisitMinutes;
      if (getHours(visitTime) === visitHours[0]) {
        newVisitMinutes = allMinutes.filter(m => parseInt(m) >= getMinutes(visitTime));
      } else if (getHours(visitTime) === getHours(endTime)) {
        // case: visiting hours end after the hour (i.e. end at 11:15am but not at 11:00am, so times less than 11:15am are valid visit times)
        newVisitMinutes = allMinutes.filter(m => parseInt(m) < getMinutes(endTime));
      } else {
        newVisitMinutes = allMinutes.slice();
      }
      setVisitHour(parseInt(event.target.value));
      setVisitMinute(newVisitMinutes[0]);
      setVisitMinutes(newVisitMinutes);
      onChange(setMinutes(visitTime, parseInt(newVisitMinutes[0])));
    } else if (event.target.name === 'minutes') {
      setVisitMinute(event.target.value);
      const visitTime = setHours(startTime, visitHour);
      onChange(setMinutes(visitTime, parseInt(event.target.value)));
    }
  };
  return (
    <Wrapper>
      <select
        name="hours"
        value={visitHour}
        className="bg-transparent appearance-none outline-none"
        onChange={handleChange}
      >
        {visitHours.map(h => (
          <option key={h} value={h}>
            {h > 12 ? h - 12 : h}
          </option>
        ))}
      </select>
      <span className="mr-3">:</span>
      <select
        name="minutes"
        value={visitMinute}
        className="bg-transparent appearance-none outline-none mr-4"
        onChange={handleChange}
      >
        {visitMinutes.map(m => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      {/* <select name='ampm' className='bg-transparent appearance-none outline-none'>
      <option value="am">AM</option>
      <option value="pm">PM</option>
    </select> */}
    </Wrapper>
  );
};

export default TimePicker;
