import React, { useRef, useEffect, ReactNode } from 'react'
import styled from 'styled-components'
import sanitizeHtml from 'sanitize-html'

export const noop = () => {}

interface WrapperProps{
  placeholder: string
}
const Wrapper = styled.div<WrapperProps>`
  *:read-write:focus {
    outline: none;
  }
  .editable:empty:before {
    display: block;
    content: '${props=>props.placeholder}';
  }
`
interface Props {
  html: string
  active: boolean
  name?: string
  tagName?: string
  className?: string
  placeholder?: string
  style?: object
  children?: ReactNode
  onInput: (html: string) => void
}
const Editable = ({ html, name, tagName, active, style, className, onInput, children, placeholder }: Props) => {
  const el = useRef<HTMLElement>()
  useEffect(() => {
    if (!el.current) return
    if (html !== el.current.innerHTML) {
      el.current.innerHTML = html
      // // replaceCaret(el.current)
    }
  }, [html])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (!el.current) return
    onInput(el.current.innerHTML)
  }
  const onPaste = (e: React.ClipboardEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!el.current) return
    el.current.innerHTML = sanitize(e.clipboardData.getData('text/html'))
    onInput(el.current.innerHTML)
  }
  const sanitize = (dirtyHtml: string): string => {
    return sanitizeHtml(dirtyHtml, {})
  }
  const replaceCaret = (el: HTMLElement) => {
    // Place the caret at the end of the element
    const target = document.createTextNode('')
    el.appendChild(target)
    // do not move caret if element was not focused
    const isTargetFocused = document.activeElement === el
    if (target !== null && target.nodeValue !== null && isTargetFocused) {
      var sel = window.getSelection()
      if (sel !== null) {
        var range = document.createRange()
        range.setStart(target, target.nodeValue.length)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
      }
      if (el instanceof HTMLElement) el.focus()
    }
  }
  return (
    <Wrapper placeholder={placeholder || ''}>
      {React.createElement(
        tagName || 'div',
        {
          ref: el,
          className: `editable ${className}`,
          style,
          name,
          contentEditable: active,
          spellCheck: true,
          suppressContentEditableWarning: true,
          onInput: onChange,
          onBlur: noop,
          onKeyUp: noop,
          onKeyDown: noop,
          onPaste,
        },
        children
      )}
    </Wrapper>
  )
}
export default React.memo(Editable)
