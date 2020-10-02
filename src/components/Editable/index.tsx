import React, { useRef, useEffect, ReactNode } from 'react'
import styled from 'styled-components'

export const noop = () => {}

const Wrapper = styled.div`
  *:read-write:focus {
    outline: none;
  }
`
interface Props {
  html: string
  active: boolean
  name?: string
  tagName?: string
  className?: string
  style?: object
  children?: ReactNode
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const Editable = ({ html, name, tagName, active, style, className, onInput, children }: Props) => {
  const el = useRef<HTMLElement>()
  useEffect(() => {
    if (!el.current) return
    if (html !== el.current.innerHTML) {
      el.current.innerHTML = html
    }
  }, [html])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (!el.current) return
    const html = el.current.innerHTML
    const event = Object.assign(e, {
      target: {
        value: html,
        name,
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
          name,
          contentEditable: active,
          suppressContentEditableWarning: true,
          onInput: onChange,
          onBlur: noop,
          onKeyUp: noop,
          onKeyDown: noop,
        },
        children
      )}
    </Wrapper>
  )
}
export default React.memo(Editable)
