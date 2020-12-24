import React, { useRef, useEffect, ReactNode, useCallback } from 'react'
import styled from 'styled-components'
import sanitizeHtml from 'sanitize-html'
import anchorme from 'anchorme'
import { debounce } from '../../utils'

export const noop = () => {}

interface WrapperProps {
  placeholder: string
}
const Wrapper = styled.div<WrapperProps>`
  *:read-write:focus {
    outline: none;
  }
  .editable:empty:before {
    content: '${props => props.placeholder}';
  }
`
interface Props {
  html: string
  active: boolean
  name?: string
  tagName?: string
  className?: string
  href?: string
  placeholder?: string
  style?: object
  children?: ReactNode
  onInput: (html: string) => void
}
const Editable = ({ html, name, tagName, href, active, style, className, onInput, children, placeholder }: Props) => {
  const el = useRef<HTMLElement>()
  const delayedInput = useCallback(
    debounce(h => onInput(h), 500),
    []
  )
  useEffect(() => {
    if (!el.current) return
    if (html !== el.current.innerHTML) {
      el.current.innerHTML = anchorme(html)
    }
  }, [html])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (el.current) {
      delayedInput(anchorme(el.current.innerHTML))
    }
  }
  const onPaste = (event: React.ClipboardEvent) => {
    if (!el.current) return
    let dataType: string
    if ('text/html' in event.clipboardData.types) dataType = 'text/html'
    else dataType = 'text/pain'
    el.current.innerHTML = sanitize(event.clipboardData.getData(dataType))
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
          ...(href && { href }),
          ...(href && { target: '_blank' }),
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
