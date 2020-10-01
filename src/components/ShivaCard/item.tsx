import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { Shiva as ShivaModel } from '../../store/shiva/types'
import { createShiva, deleteShiva } from '../../store/shiva/actions'
import { ShivaItemWrapper } from './styles'
import Dropdown, { MenuItem } from './dropdown'

interface ShivaProps extends ShivaModel {}

const menu: MenuItem[] = [
  { id: 1, text: 'Copy link for mourners' },
  { id: 2, text: 'Copy link for visitors' },
  { id: 3, text: 'Edit' },
  { id: 4, text: 'Duplicate' },
  { id: 5, text: 'Delete', props: { color: '#c82323' } },
]

const ShivaItem = (props: ShivaProps) => {
  const { _id, nameOfDeceased, startDate, endDate } = props
  const dispatch = useDispatch()

  const handleMenuClick = (menu: MenuItem) => {
    switch (menu.id) {
      case 1: // handle copy link for mourners
        break
      case 2: // handle copy link for visitors
        break
      case 3: // navigate to shiva edit page
        dispatch(push(`/shiva/${_id}`))
        break
      case 4: // duplicate shiva
        dispatch(createShiva(props))
        break
      case 5: // delete shiva
        dispatch(deleteShiva(_id))
        break
    }
  }
  return (
    <ShivaItemWrapper
      onClick={() => {
        dispatch(push(`/shiva/${_id}`))
      }}
    >
      <header
        onClick={(ev: React.MouseEvent) => {
          ev.stopPropagation()
        }}
      >
        <Dropdown menu={menu} menuClickHandler={handleMenuClick} />
      </header>
      <section>
        <p>{nameOfDeceased}</p>
        <div>
          {startDate.format('L')} - {endDate?.format('L')}
        </div>
      </section>
    </ShivaItemWrapper>
  )
}
export default ShivaItem
