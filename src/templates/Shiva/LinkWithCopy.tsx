import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addNotification } from '../../store/app/actions'
import { initializeNotification } from '../../store/app/types'
import CheckIcon from '../../assets/img/checkbox.svg'

const Wrapper = styled.div`
  display: flex;
  .linktext {
    display: inline-block;
    background-color: white;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    width: 280px;
    line-height: 47px;
    color: ${props => props.theme.colors.heavyMetal};
    opacity: 0.6;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 15px;
  }
  .linkcopy {
    display: inline-block;
    background-color: ${props => props.theme.colors.richGold};
    color: white;
    padding: 0 18px;
    line-height: 47px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

interface Props {
  text: string
}
const LinkWithCopy = ({text}: Props) => {
  const dispatch = useDispatch()
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
  const handleCopyLink = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text)
        notify('Link copied', 'The link for mourners to edit the shiva has been added to your clipboard.')
      } catch (error) {
        console.log(error) // we should show a message
      }
    } else {
      // this is a polyfill
      document.execCommand('copy')
    }
  }
  return <Wrapper>
    <div className="linktext">{text}</div>
    <button className="linkcopy" onClick={handleCopyLink}>copy</button>
  </Wrapper>
}

export default LinkWithCopy
