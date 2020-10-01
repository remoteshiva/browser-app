import React from 'react'
import { NewShivaItemWrapper } from './styles'

interface Props {
  onClick: () => void
}

const NewShivaItem = ({ onClick }: Props) => {
  return (
    <NewShivaItemWrapper onClick={onClick}>
      <p>Create New Shiva</p>
    </NewShivaItemWrapper>
  )
}
export default NewShivaItem
