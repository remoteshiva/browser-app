import React from 'react'
import styled from 'styled-components'
import { Shiva } from '../../store/shiva/types'
import CloseIcon from '../../assets/img/closex.svg'
import { ClickOutside } from '../ClickOutside'
import { VerticalSpace, ApproveButton } from '../common'


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
  z-index: 1000;
`

const Modal = styled(ClickOutside)`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.sauvignonLight};
  border-radius: 10px;
  z-index: 2010;
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
  p{
    font-family: 'Lato';
    font-size: 16px;
  }
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
  textarea{
    height: 143px;
    padding: 15px;
    resize: none;
    width: 100%;
    border: solid 1px ${props=> props.theme.colors.sauvignonLight};
    color: ${props => props.theme.colors.heavyMetal};
    border-radius: 1px;
    margin-bottom: 40px;
    font-size: 16px;
    line-height: 22px;
    &::placeholder{
      color: ${props=> props.theme.colors.dawn};
    }
  }
  section {
    width:360px;
    margin: auto;
  }
  .label{
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

const InviteVisitorsModal = ({shiva, onClose}: Props) => {
  const link = `${process.env.REACT_APP_BASE_URL}/v/${shiva.visitorKey}`
  return (
    <Fade>
      <Modal onClickOutside={onClose}>
        <button className='close' onClick={onClose}></button>
        <h2>Invite Visitors</h2>
        <VerticalSpace height={20}/>
        <p>Send the link below (along with the password if you choose to add one) to people who might be interested in attending the shiva. If mourners belong to synagogues, consider sending a message with this link to their synagogue bulletins.</p>
        <VerticalSpace height={20}/>
        <section>
          <div className='label'>Copy this URL to share:</div>
            <div className='linktext'>{link}</div>
          <button className='linkcopy'>copy</button>
        </section>
        <section>
          <div className='label'>Message to copy (optional)</div>
          <textarea/>
          <div>
            <ApproveButton>Copy message</ApproveButton>
          </div>
        </section>
      </Modal>
    </Fade>
  )
}

export default InviteVisitorsModal;