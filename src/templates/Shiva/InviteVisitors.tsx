import React, {useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Shiva } from '../../store/shiva/types'
import CloseIcon from '../../assets/img/closex.svg'
import { ClickOutside } from '../../components/ClickOutside'
import { useNotify } from '../../components/common/hooks'
import { VerticalSpace, ApproveButton } from '../../components/common'
import LinkWithCopy from './LinkWithCopy'
import { patchSelectedShiva } from '../../services/shiva'

const Fade = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(65, 65, 58, 0.6);
  z-index: 10;
`

const Modal = styled(ClickOutside)`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.sauvignonLight};
  border-radius: 10px;
  z-index: 20;
  width: 630px;
  height: 700px;
  padding: 48px 78px;
  text-align: center;
  color: ${props => props.theme.colors.heavyMetal};
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    background-image: url(${CloseIcon});
    width: 20px;
    height: 20px;
  }
  h2 {
    font-family: 'Lora';
    font-weight: normal;
    font-size: 56px;
  }
  p {
    font-family: 'Lato';
    font-size: 16px;
  }
  textarea {
    height: 143px;
    padding: 15px;
    resize: none;
    width: 100%;
    border: solid 1px ${props => props.theme.colors.sauvignonLight};
    color: ${props => props.theme.colors.heavyMetal};
    border-radius: 1px;
    margin-bottom: 40px;
    font-size: 16px;
    line-height: 22px;
    &::placeholder {
      color: ${props => props.theme.colors.dawn};
    }
  }
  section {
    width: 360px;
    margin: auto;
  }
  .label {
    font-family: 'Lato';
    font-size: 16px;
    text-align: left !important;
    width: 100%;
    margin-top: 30px;
    color: ${props => props.theme.colors.doveGray};
  }
`
interface Props {
  shiva: Shiva
  onClose: () => void
}

const InviteVisitorsModal = ({ shiva, onClose }: Props) => {
  const dispatch = useDispatch()
  const notify = useNotify()
  const [message, setMessage] = useState(shiva.inviteMessage || '')
  const link = `${process.env.REACT_APP_BASE_URL}/v/${shiva.visitorKey}`

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }
  const handleCopyMessage = async () => {
    const partial = { inviteMessage: message }
    try{
      const res = await dispatch(patchSelectedShiva(partial))
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(message)
          notify('Message copied', 'The message for visitors has been added to your clipboard.')
        } catch (error) {
          console.log(error) // we should show a message
        }
      } else {
        // this is a polyfill
        document.execCommand('copy')
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    if (message==='')
      setMessage(`With great sadness, we share that ${shiva.nameOfDeceased}, Z”L, has passed. Those mourning are sitting shiva remotely. Shiva details, including visiting hours and link, can be found at ${link}`)
  }, [])

  return (
    <Fade>
      <Modal onClickOutside={onClose}>
        <button className="close" onClick={onClose}></button>
        <h2>Invite Visitors</h2>
        <VerticalSpace height={20} />
        <p>
          Send the link below to people who might be interested in attending the shiva. If mourners belong to synagogues, consider sending a message
          with this link to their synagogue bulletins.
        </p>
        <VerticalSpace height={20} />
        <section>
          <div className="label">Copy this URL to share:</div>
          <LinkWithCopy text={link}/>
        </section>
        <section>
          <div className="label">Message to copy (optional)</div>
          <textarea value={message} onChange={handleMessageChange}/>
          <div>
            <ApproveButton onClick={handleCopyMessage}>Copy message</ApproveButton>
          </div>
        </section>
      </Modal>
    </Fade>
  )
}

export default InviteVisitorsModal
