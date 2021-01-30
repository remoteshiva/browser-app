import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import CloseIcon from '../../assets/img/closex.svg'
import WarningIcon from '../../assets/img/warning.svg'
import { ClickOutside } from '../../components/ClickOutside'

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
  background-color: ${props => props.theme.colors.white};
  border-radius: 10px;
  z-index: 20;
  width: 360px;
  height: 312px;
  text-align: center;
  color: ${props => props.theme.colors.white};
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    background-image: url(${CloseIcon});
    width: 20px;
    height: 20px;
  }
  section{
    margin-top: 30px;
    padding: 0 35px;
    text-align: center;
    .warningIcon{
      background-image: url(${WarningIcon});
      background-repeat: no-repeat;
      background-position: center center;
      border-radius: 50%;
      margin: 0 auto;
      margin-bottom: 21px;
      width: 76px;
      height: 76px;
      background-color: ${ props => props.theme.colors.sauvignonLight }
    }
    .title{
      font-family: 'Lato';
      font-size: 17px;
      font-weight: 800;
      color: ${props=>props.theme.colors.heavyMetal};
    }
    .confirm-text{
      font-family: 'Lato';
      font-size: 14px;
      color: ${props => props.theme.colors.dawn};
    }
  }
  .buttons {
    position: absolute;
    display: flex;
    width: 100%;
    bottom: 0;
    height: 70px;
    padding: 10px 20px;
    border-top: 1px solid ${props=>props.theme.colors.blackHaze};
    .yes{
      border-radius: 15px;
      background-color: ${props=>props.theme.colors.richGold};
      padding: 13px 39px;
    }
    .no{
      margin-left: auto;
      padding: 13px 39px;
      color: ${props=>props.theme.colors.doveGray};

    }
  }
`
interface Props {
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDeleteModal = ({ onConfirm, onCancel }: Props) => {
  const el = useRef(document.createElement('div'))

  useEffect(()=>{
    const mount = document.getElementById('modal') as HTMLElement
    mount!.appendChild(el.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => void mount!.removeChild(el.current)
  },[])

  const renderModal = () =>
  (
    <Fade>
      <Modal onClickOutside={onCancel}>
        <button className="close" onClick={onCancel}></button>
        <section>
          <div className='warningIcon'></div>
          <div className='title'>Please Confirm</div>
          <div className='confirm-text'>Do you want to delete a time slot? Visitors signed up for this time will receive an email notification.</div>
        </section>
        <div className='buttons'>
          <button className='no' onClick={onCancel}>No</button>
          <button className='yes' onClick={onConfirm}>Yes</button>
        </div>
      </Modal>
    </Fade>
  )
  return createPortal(renderModal(), el.current)

}





export default ConfirmDeleteModal
