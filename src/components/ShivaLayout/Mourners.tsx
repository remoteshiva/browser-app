import React from 'react'
import styled from 'styled-components'
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
    border-bottom: 1px dashed green;
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

const Mourners = ({ role, shiva, editing }: ShivaPanel) => {
  const handleInput = () => {}
  const handleAddMourner = () => {}
  return (
    <Wrapper>
      <h2>Mourners</h2>
      <ul>
        {shiva.mourners.map((m, i) => (
          <li key={i} className={editing ? 'edit' : ''}>
            {editing ? (
              <>
                <img src={DeleteIcon} alt="delete" />
                <Editable className="base name" html={m.name} active={true} onInput={handleInput} />
                <Editable className="base relationship" html={m.relationship} active={true} onInput={handleInput} />
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
