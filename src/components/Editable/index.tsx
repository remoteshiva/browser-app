import React, { useRef, useEffect, ReactNode } from 'react'
import styled from 'styled-components'
import sanitizeHtml from 'sanitize-html'

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
      el.current.innerHTML = sanitize(html)
      replaceCaret(el.current)
    }
  }, [html])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (!el.current) return
    const html = el.current.innerHTML // = sanitize(el.current.innerHTML))
    const event = Object.assign(e, {
      target: {
        value: sanitize(html),
        name,
      },
    })
    onInput(event)
  }
  const sanitize = (dirtyHtml: string): string => {
    // const html = dirtyHtml && dirtyHtml.replace(/&nbsp;|\u202F|\u00A0/g, ' ')
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
    <Wrapper>
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
        },
        children
      )}
    </Wrapper>
  )
}
export default React.memo(Editable)
