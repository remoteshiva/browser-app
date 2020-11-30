import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Mourner } from '../../store/shiva/types'
import { addNotification } from '../../store/app/actions'
import { initializeNotification } from '../../store/app/types'
import AddIcon from '../../assets/img/add.svg'
import ClearIcon from '../../assets/img/clear.svg'
import CopyIcon from '../../assets/img/copy.svg'
import CheckIcon from '../../assets/img/checkbox.svg'
import BasicDetailsArt from '../../assets/img/add-basic-details.svg'
import { Row, FixedColumn, FlexColumn } from '../../components/flexLayout'
import { StepProps, MournersProps, Steps } from './types'
import { ImageWrapper } from './styles'
import StepLayout from './Layout'

const AddMournerButton = styled.button`
  font-family: 'Lato';
  font-size: 16px;
  color: ${props => props.theme.colors.richGold};
`

const MournerBoxWrapper = styled.div`
  position: relative;
  margin-bottom: 30px;
  width: 327px;
  input {
    padding: 0.75rem 1rem;
    border-radius: 2px;
    border: solid 1px ${props => props.theme.colors.sauvignonLight};
    width: 100%;
  }
`
const MournerBoxClear = styled.img`
  position: absolute;
  right: 0;
  z-index: 10;
`

interface MournerProps extends Mourner {
  index: number
}

interface MournerBoxProps extends MournerProps {
  onUpdate: (data: MournerProps) => void
  onRemove: (id: number) => void
}

const MournerBox = ({ index, name, relationship, onUpdate, onRemove }: MournerBoxProps) => {
  const [values, setValues] = useState({ index, name, relationship })

  useEffect(() => {
    onUpdate({ ...values })
  }, [values]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  return (
    <MournerBoxWrapper>
      <MournerBoxClear onClick={() => onRemove(values.index)} src={ClearIcon} />
      <input name="name" type="text" value={values.name} onChange={handleInputChange} placeholder="Name" required autoComplete="off" />
      <input name="relationship" type="text" value={values.relationship} onChange={handleInputChange} placeholder="Relationship" required autoComplete="off" />
    </MournerBoxWrapper>
  )
}

const emptyMourner = { name: '', relationship: '' }
const mournerPathPrefix = `${process.env.REACT_APP_BASE_URL}/m/`

const Mourners = ({ newShiva, submit, selectStep }: StepProps<MournersProps>) => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLButtonElement>(null)
  const [mourners, setMourners] = useState(newShiva.mourners.length ? newShiva.mourners : [emptyMourner])
  const [mournerKey] = useState(newShiva.mournerKey)

  const handleAddMourner = () => {
    setMourners([...mourners, emptyMourner])
  }
  const handleRemoveMourner = (index: number) => {
    const l = [...mourners]
    l.splice(index, 1)
    setMourners(l)
  }
  const copyToClipboard = () => {
    if (inputRef.current) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${mournerPathPrefix}${mournerKey}`).then(
          () => {
            dispatch(
              addNotification(
                initializeNotification({
                  title: 'Link copied',
                  description: 'The link for mourners to edit the shiva has been added to your clipboard.',
                  icon: CheckIcon,
                })
              )
            )
          },
          error => {
            console.log(error) // we should show a message
          }
        )
      } else {
        // this is a polyfill
        document.execCommand('copy')
      }
    }
  }
  const setMournerData = ({ index, name, relationship }: MournerProps) => {
    console.log('setting mourner data', index, name, relationship)
    const m = [...mourners]
    m[index] = { name, relationship }
    setMourners([...m])
  }

  const submitMourners = () => {
    submit({ mourners, mournerKey }, Steps.VISITS)
  }
  return (
    <StepLayout title={'Add mourners'} step={3} submit={() => submitMourners()} submitText="Next: Set visiting hours" stepperClickHandler={selectStep}>
      <Row>
        <FixedColumn width={400}>
          <p>Add the names of the people sitting shiva and their relationship to the deceased.</p>
          <br />
          <p>You can share editing privileges with the mourners or other organizers through the following link:</p>
          <a href={`${mournerPathPrefix}${mournerKey}`} target="_blank" rel="noopener noreferrer">
            {mournerPathPrefix}
            {mournerKey}
          </a>
          <button ref={inputRef} onClick={copyToClipboard}>
            <img style={{ marginLeft: '6px' }} src={CopyIcon} alt="copy" />
          </button>
          <br />
          <br />
          <div>
            {mourners.map((m, i) => (
              <MournerBox key={i} index={i} name={m.name} relationship={m.relationship} onRemove={handleRemoveMourner} onUpdate={setMournerData} />
            ))}
          </div>
          <AddMournerButton onClick={handleAddMourner}>
            <img src={AddIcon} alt="remove" />
            &nbsp;&nbsp;Add another mourner
          </AddMournerButton>
        </FixedColumn>
        <FlexColumn>
          <ImageWrapper>
            <img src={BasicDetailsArt} alt="Basic details" />
          </ImageWrapper>
        </FlexColumn>
      </Row>
    </StepLayout>
  )
}

export default Mourners
