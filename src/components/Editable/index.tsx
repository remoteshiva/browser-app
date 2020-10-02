import React, { useRef, useEffect, ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  *:read-write:focus {
    outline: none;
  }
`
interface Props {
  html: string
  tagName?: string
  active: boolean
  className?: string
  style?: object
  children?: ReactNode
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const Editable = ({ html, tagName, active, style, className, onInput, children }: Props) => {
  const el = useRef<HTMLElement>()
  useEffect(() => {
    if (!el.current) return
    if (html !== el.current.innerHTML) {
      el.current.innerHTML = html
    }
  }, [html])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!el.current) return
    const html = el.current.innerHTML
    const event = Object.assign(e, {
      target: {
        value: html,
      },
    })
    onInput(event)
  }
  return (
    <Wrapper>
      {React.createElement(
        tagName || 'div',
        {
          ref: el,
          className,
          style,
          contentEditable: active,
          suppressContentEditableWarning: true,
          onInput: onChange,
          onBlur: onChange,
          onKeyUp: onChange,
          onKeyDown: onChange,
        },
        children
      )}
    </Wrapper>
  )
}
export default React.memo(Editable)
