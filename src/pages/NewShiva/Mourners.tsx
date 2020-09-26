import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Mourner } from '../../store/shiva/types'
import AddIcon from '../../assets/img/add.svg'
import ClearIcon from '../../assets/img/clear.svg'
import BasicDetailsArt from '../../assets/img/add-basic-details.svg'
import { Row, FixedColumn, FlexColumn } from '../../components/flexLayout'
import { StepProps, MournersProps, Steps } from './types'
import { ImageWrapper } from './styles'
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
    console.log(name, value)
    setValues({...values, [name]: value})
  } 
  return(
    <MournerBoxWrapper>
      <MournerBoxClear onClick={ ()=> onRemove(values.id)} src={ClearIcon}/>
      <input name='name' type='text' value={values.name}  onChange={handleInputChange} placeholder='Name' required/>
      <input name='relationship' type='text' value={values.relationship} onChange={handleInputChange} placeholder='Relationship' required className='appearance-none block w-full bg-grey-lighter rounded py-3 px-4 mb-3'/>
    </MournerBoxWrapper>
  )
}
const generateRandomKey = ():string => {return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}
const emptyMourner = {name: '', relationship: ''}

const Mourners = ({newShiva, submit, selectStep}: StepProps<MournersProps>) => {
  const [mourners, setMourners] = useState(newShiva.mourners.length ? newShiva.mourners : [emptyMourner])
  const [mournerKey, setMournerKey] = useState(newShiva.mournerKey)
  
  useEffect(() => {
    setMournerKey(generateRandomKey())
  }, [])
  
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
      submit={() => submit({mourners, mournerKey},Steps.VISITS )}
      submitText='Next: Set visiting hours'
      stepperClickHandler={selectStep}
    >
      <Row>
        <FixedColumn width={360}>
          <p>Add the names of the people sitting shiva and their relationship to the deceased.</p>
          <br/>
          <p>You can share editing privileges with the mourners or other organizers through the following link: 
          </p>
          <a href={`/m/${mournerKey}`} target="_blank" rel="noopener noreferrer">
            remoteshiva.org/m/{mournerKey}
          </a>
          <br/>
          <br/>
          <div>
            {mourners.map((m, i) => (<MournerBox key={i} id={i} name={m.name} relationship={m.relationship} onRemove={handleRemoveMourner}/>))}
          </div>
          <div onClick={handleAddMourner}><img src={AddIcon} alt='remove'/>Add another mourner</div>
      </FixedColumn>
        <FlexColumn>
            <ImageWrapper><img src={BasicDetailsArt} alt='Basic details'/></ImageWrapper>
          </FlexColumn>
      </Row>
    </StepLayout>
  )
}

export default Mourners