import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { Shiva } from '../../store/shiva/types'
import { addNotification } from '../../store/app/actions'
import { initializeNotification } from '../../store/app/types'
import { postShiva, deleteExistingShiva } from '../../services/shiva'
import CheckIcon from '../../assets/img/checkbox.svg'
import { ShivaItemWrapper } from './styles'
import Dropdown, { MenuItem } from './dropdown'

const mournerPathPrefix = `${process.env.REACT_APP_BASE_URL}/m/`
const visitorPathPrefix = `${process.env.REACT_APP_BASE_URL}/v/`

interface ShivaProps extends Shiva {}

const menu: MenuItem[] = [
  { id: 1, text: 'Copy link for mourners' },
  { id: 2, text: 'Copy link for visitors' },
  { id: 3, text: 'Edit' },
  { id: 4, text: 'Duplicate' },
  { id: 5, text: 'Delete', props: { color: '#c82323' } },
]

const ShivaItem = (props: ShivaProps) => {
  const { id, nameOfDeceased, startDate, endDate, mournerKey, visitorKey } = props
  const dispatch = useDispatch()
  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text)
      } catch (error) {
        console.log(error) // we should show a message
      }
    } else {
      // this is a polyfill
      document.execCommand('copy')
    }
  }
  const notify = (title: string, description: string) => {
    dispatch(
      addNotification(
        initializeNotification({
          title,
          description,
          icon: CheckIcon,
        })
      )
    )
  }
  const handleMenuClick = async (menu: MenuItem) => {
    switch (menu.id) {
      case 1: // handle copy link for mourners
        await copyToClipboard(`${mournerPathPrefix}${mournerKey}`)
        notify('Link copied', 'The link for mourners to edit the shiva has been added to your clipboard.')
        break
      case 2: // handle copy link for visitors
        await copyToClipboard(`${visitorPathPrefix}${visitorKey}`)
        notify('Link copied', 'The link for visitors has been added to your clipboard.')
        break
      case 3: // navigate to shiva edit page
        dispatch(push(`/shiva/${id}`))
        break
      case 4: // duplicate shiva
        dispatch(postShiva(props))
        break
      case 5: // delete shiva
        dispatch(deleteExistingShiva(id))
        break
    }
  }
  return (
    <ShivaItemWrapper
      onClick={() => {
        dispatch(push(`/shiva/${id}`))
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
          {startDate.toLocaleDateString()} - {endDate?.toLocaleDateString()}
        </div>
      </section>
    </ShivaItemWrapper>
  )
}
export default ShivaItem
