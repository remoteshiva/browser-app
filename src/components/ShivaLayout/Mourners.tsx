import React from 'react'
import { ShivaPanel, withPanel } from './Panel'
import { VerticalSpace } from '../common'
import CopyIcon from '../../assets/img/copy.svg'
import { MournerName, Note, Relationship } from './styles'


const Mourners = ({shiva, editing}: ShivaPanel) => {
  const renderView = () =>(
    <>
      <h2>Mourners</h2>
      <ul>
        {shiva.mourners.map((m, i) => (
          <li style={{display: 'flex', flexDirection: 'row'}} key={i}>
            <MournerName>{m.name}</MournerName>
            <Relationship>{m.relationship}</Relationship>
          </li>
        ))}
      </ul>
      <VerticalSpace height={10}/>
      <button><img style={{display: 'inline'}} src={CopyIcon} alt='copy'/>Copy invite link</button>
      <VerticalSpace height={10}/>
      <Note>Note: Anyone who accesses the shiva through this link will be able to edit.</Note>
    </>
  )
  const renderEdit = () => (
    <>
      edit mode
    </>
  )
  return (
    <>{editing? renderEdit() : renderView()}</>
  )
}

export default withPanel(Mourners)