import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { updateShiva } from '../../store/shiva/actions'
import { ShivaPanel, withPanel } from './Panel'
import { VerticalSpace } from '../common'
import Editable from '../Editable'
import CopyIcon from '../../assets/img/copy.svg'
import AddIcon from '../../assets/img/add.svg'
import DeleteIcon from '../../assets/img/delete.svg'
import { MournerName, Note, Relationship } from './styles'

const Wrapper = styled.div`
  li {
    display: flex;
    flex-direction: row;
    &.edit {
      margin-bottom: 15px;
    }
  }
  img {
    display: inline-block;
    margin-right: 11px;
  }
  .base {
    border-bottom: 1px dashed ${props => props.theme.colors.blueChill};
    font-family: 'Lato';
    font-size: 16px;
    color: ${props => props.theme.colors.heavyMetal};
  }
  .name {
    width: 118px;
    margin-right: 14px;
  }
  .relationship {
    width: 100px;
    font-weight: 100;
    font-style: italic;
    color: ${props => props.theme.colors.doveGray};
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const AddMournerButton = styled.button`
  font-family: 'Lato';
  font-size: 16px;
  color: ${props => props.theme.colors.richGold};
`
type RE = React.ChangeEvent<HTMLInputElement>

const Mourners = ({ role, shiva, editing, save }: ShivaPanel) => {
  const dispatch = useDispatch()
  const [mourners, setMourners] = useState(shiva.mourners)
  useEffect(() => {
    const partialShiva = { mourners }
    dispatch(updateShiva(shiva._id, partialShiva))
  }, [save, dispatch, mourners, shiva._id])
  const handleInput = (index: number, key: string, value: string) => {
    const newMourners = mourners.map((m, i) => {
      if (i === index) {
        return { ...m, [key]: value }
      }
      return m
    })
    setMourners([...newMourners])
  }
  const handleAddMourner = () => {
    setMourners([...mourners, { name: '', relationship: '' }])
  }
  const handleDeleteMourner = (index: number) => {
    setMourners([...mourners.filter((m, i) => i !== index)])
  }
  return (
    <Wrapper>
      <h2>Mourners</h2>
      <ul>
        {mourners.map((m, i) => (
          <li key={i} className={editing ? 'edit' : ''}>
            {editing ? (
              <>
                <img src={DeleteIcon} alt="delete" onClick={() => handleDeleteMourner(i)} />
                <Editable className="base name" html={m.name} active={true} onInput={(e: RE) => handleInput(i, 'name', e.target.value)} />
                <Editable className="base relationship" html={m.relationship} active={true} onInput={(e: RE) => handleInput(i, 'relationship', e.target.value)} />
              </>
            ) : (
              <>
                <MournerName>{m.name}</MournerName>
                <Relationship>{m.relationship}</Relationship>
              </>
            )}
          </li>
        ))}
        {editing ? (
          <AddMournerButton onClick={handleAddMourner}>
            <img src={AddIcon} alt="remove" />
            &nbsp;&nbsp;Add another mourner
          </AddMournerButton>
        ) : null}
      </ul>
      {role === 'Visitor' || editing ? null : (
        <>
          <VerticalSpace height={10} />
          <button>
            <img style={{ display: 'inline' }} src={CopyIcon} alt="copy" />
            Copy invite link
          </button>
          <VerticalSpace height={10} />
          <Note>Note: Anyone who accesses the shiva through this link will be able to edit.</Note>
        </>
      )}
    </Wrapper>
  )
}

export default withPanel(Mourners)
