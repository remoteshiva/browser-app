import React from 'react'
import styled from 'styled-components'
import { Visit, Visitor, Mourner } from '../../store/shiva/types'
import CheckedIcon from '../../assets/img/checkbox-round-checked.svg'
import UncheckedIcon from '../../assets/img/checkbox-round-unchecked.svg'
import { VerticalSpace } from '../../components/common'
import { CalendarMode } from '../types'


const Wrapper = styled.div`
  display: block;
  width: 250px;
  text-align: left;
  padding: 13px 25px 20px 25px;
  font-family: 'Lato';
  font-size: 13px;
  /* line-height: 25px; */
  cursor: pointer;
  .title{
    font-size: 15px;
    font-weight: 600;
    color: ${props=> props.theme.colors.heavyMetal};
  }
  .mourner{
    /* margin-top: 10px; */
    .name{
      display: inline;
      margin-right: 14px;
      font-weight: normal;
      color: ${props=> props.theme.colors.doveGray};
    }
    .relationship{
      display: inline;
      font-style: italic;
      font-weight: 100;
      color: ${props => props.theme.colors.doveGray};
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .visitor{
    color: ${props => props.theme.colors.doveGray};
  }
  button{
    width: 100%;
    padding: 8px;
    border-radius: 16.5px;
    background-color: ${props=>props.theme.colors.richGold};
    color: white;
  }
`

interface MournerRowProps extends Mourner {
  mode: CalendarMode
}
const MournerRow = ({name, relationship, mode}: MournerRowProps) => {
  return(
    <div className='mourner'>
      {mode === 'Edit' ? <img src={CheckedIcon} alt='checkbox'/> : null }
      <span className='name'>{name}</span>
      <span className='relationship'>{relationship}</span>
    </div>
  )
}

const VisitorRow = ({name, time}: Visitor) => (
  <div className='visitor'>
    {name} ({time? time: null})
  </div>
)

interface Props extends Visit {
  mode: CalendarMode
  mournersList: Mourner[]
  onAddVisitor: ()=>void
}

const VisitData = ({mode, mournersList, visitors, mourners, onAddVisitor}: Props) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }
  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation()
  }
  const renderMourners = () => {
    let list: Mourner[]
    if(mode==='Edit'){
      list = mournersList
    }else{
      list = mournersList
    }
    return list.map((m,i) => <MournerRow key={i} mode={mode} {...m}/>)
  }
  return (
    <Wrapper onClick={handleClick} onMouseDown={handleMouseDown}>
      <div className='title'>Mourners</div>
      {renderMourners()}
      <VerticalSpace height={10}/>
      <div className='title'>Visitors</div>
      {visitors.map((v, i)=>(<VisitorRow key={i} {...v}/>))}
      <VerticalSpace height={15}/>
      <button onClick={onAddVisitor}>Plan to visit</button>
    </Wrapper>
  )
}

export default VisitData
