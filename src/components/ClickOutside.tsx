import React, { ReactNode, useEffect, useRef } from 'react'

export const noop = () => {}

export interface ClickOutsideProps {
  style?: React.CSSProperties
  className?: string
  children?: ReactNode
  onClickOutside?: (clickTarget: HTMLElement) => void
}

const ClickOutside = ({ children, className, onClickOutside = noop }: ClickOutsideProps) => {
  const node = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement
      if (node.current && target && !node.current.contains(target)) {
        onClickOutside(target)
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [onClickOutside])

  return (
    <div ref={node} className={className}>
      {children}
    </div>
  )
}

export { ClickOutside }
