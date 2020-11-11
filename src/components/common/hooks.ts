import { useRef, useEffect, RefObject } from 'react'
import { useDispatch } from 'react-redux'
import { addNotification } from '../../store/app/actions'
import { initializeNotification } from '../../store/app/types'
import CheckIcon from '../../assets/img/checkbox.svg'
import { AppDispatch } from '../../store'

export function useEventListener<T extends HTMLElement = HTMLDivElement>(eventName: string, handler: Function, element?: RefObject<T>) {
  // Create a ref that stores handler
  const savedHandler = useRef<Function>()
  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.current || window
    if (!(targetElement && targetElement.addEventListener)) {
      return
    }
    // Update saved handler if necessary
    if (savedHandler.current !== handler) {
      savedHandler.current = handler
    }
    // Create event listener that calls handler function stored in ref
    const eventListener = (event: Event) => {
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!savedHandler?.current) {
        savedHandler.current(event)
      }
    }
    targetElement.addEventListener(eventName, eventListener)
    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element, handler])
}

export function useNotify() {
  const dispatch = useDispatch<AppDispatch>()
  return (title: string, description: string) => {
    dispatch(
      addNotification(
        initializeNotification({
          title,
          description,
          icon: CheckIcon,
        })
      )
    )
  }
}
