import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import AddIcon from '../../assets/img/add.svg'
import ClearIcon from '../../assets/img/clear.svg'
import { Mourner } from '../../store/shiva/types'
import { StepProps, MournersProps } from './types'
import StepLayout from './Layout'


const MournerBoxWrapper = styled.div`
  position: relative;
  margin-bottom: 30px;
  input{
    padding: 0.75rem 1rem;
    width: 327px;
    border-radius: 2px;
    border: solid 1px ${props=> props.theme.colors.sauvignonLight};
  }
`
const MournerBoxClear = styled.img`
  position: absolute;
  right: 0;
  z-index: 10;
`

interface MournerBoxProps extends Mourner {
  id: number
  onUpdate?: () => void
  onRemove: (id:number) => void
}
const MournerBox = ({id, name, relationship, onUpdate, onRemove}:MournerBoxProps) => {
  const [values, setValues] = useState({id, name, relationship})
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setValues({...values, [name]: value})
  } 
  return(
    <MournerBoxWrapper>
      <MournerBoxClear onClick={ ()=> onRemove(values.id)} src={ClearIcon}/>
      <input name='name' type='text' value={name}  onChange={handleInputChange} placeholder='Name' required/>
      <input name='relationship' type='text' value={relationship} onChange={handleInputChange} placeholder='Relationship' required className='appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3'/>
    </MournerBoxWrapper>
  )
}

const Mourners = ({submit}: StepProps<MournersProps>) => {
  const [mourners, setMourners] = useState([{name: '', relationship: ''}])
  const handleAddMourner = () => {
    setMourners([...mourners, {name: '', relationship: ''}])    
  }
  const handleRemoveMourner = (index: number) => {
    const l = [...mourners]
    l.splice(index, 1)
    setMourners(l)
  }

  return(
    <StepLayout
      title={'Add mourners'}
      step={3}
      withGraphics={true}
      submit={() => submit({mourners})}
      submitText='Next: Set visiting hours'
    >
      <p>Add the names of the people sitting shiva and their relationship to the deceased.</p>
      <br/>
      <p>You can share editing privileges with the mourners or other organizers through the following link:
remoteshiva.org/johndoeaha891clrqu</p>
      <br/>
      <div>
        {mourners.map((m, i) => (<MournerBox id={i} name={m.name} relationship={m.relationship} onRemove={handleRemoveMourner}/>))}
      </div>
      <div onClick={handleAddMourner}><img src={AddIcon} alt='remove'/>Add another mourner</div>
    </StepLayout>
  )
}

export default Mourners