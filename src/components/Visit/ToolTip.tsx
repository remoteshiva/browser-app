import React, { ReactNode, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { ClickOutside } from '../ClickOutside'

interface WrapperProps {
  left: string
  top: string
  backgroundColor?: string
}
const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  left: ${props => props.left};
  top: ${props => props.top};
  box-shadow: 0 2px 20px 0 rgba(65, 65, 58, 0.1);
  border-radius: 5px;
  background-color:${props=> props.backgroundColor ? props.backgroundColor :  'white'};
  text-align: center;
  z-index: 9999;

  #arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    &:after {
      content: ' ';
      background-color: ${props=> props.backgroundColor ? props.backgroundColor :  'white'};
      box-shadow: -1px -1px 1pxrgba(65, 65, 58, 0.1);
      position: absolute;
      top:30px;
      left: -5px;
      transform: rotate(45deg);
      width: 10px;
      height: 10px;
      pointer-events: none;
    }
  }
`

interface Props  extends WrapperProps{
  onHide: ()=>void
  children?: ReactNode
}

const ToolTip = ({left, top, backgroundColor, onHide, children}: Props) => {
  const el = useRef(document.createElement('div'))
  useEffect(()=>{
    const mount = document.getElementById('visit-tips') as HTMLElement
    mount!.appendChild(el.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => void mount!.removeChild(el.current)
  },[])

  const renderTip = () => (
    <ClickOutside onClickOutside={onHide}>
      <Wrapper left={left} top={top} backgroundColor={backgroundColor}>
        <div id='arrow'/>
        {children}
      </Wrapper>
    </ClickOutside>
  )
  return createPortal(renderTip(), el.current)
}

export default ToolTip
