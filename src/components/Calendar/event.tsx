import React, { PureComponent } from 'react'
import { Visit } from '../../store/shiva/types'
import { EventWrapper, PIXELS_PER_HOUR, PIXELS_PER_MINUTE, Pixels } from './styles'


interface NewEventProps {
  top: Pixels
  bottom: Pixels
}
export const NewEvent = ({top, bottom}: NewEventProps) => ( // this is a temporary event meant for drawing only
  <EventWrapper top={top} height={bottom-top}>
    new visit
  </EventWrapper>
)


interface InteractionData {
  isPristine: boolean
  dragStartX: number
  dragStartY: number
  mouseX: number
  mouseY: number
}
  
type Interaction = { type: 'none' } | { type: 'drag'; data: any } | { type: 'resize-from-top'; data: any } | { type: 'resize-from-bottom'; data: any }
type InteractionType = 'drag' | 'resize-from-top' | 'resize-from-bottom'
 

interface Props {
  visit: Visit 
  hourOffset: number
}

interface State {
  interaction: Interaction
}
  
export class CalendarEvent extends PureComponent<Props, State> {
  private ticking: boolean = false // the requestAnimationFrame "busy" status

  constructor(props: Props) {
    super(props)
    this.state = {
      interaction: { type: 'none' },
    }
  }
  public handleDrag = (event: React.MouseEvent) => this.handleMouseDown(event, 'drag')
  public handleResizeFromTop = (event: React.MouseEvent) => this.handleMouseDown(event, 'resize-from-top')
  public handleResizeFromBottom = (event: React.MouseEvent) => this.handleMouseDown(event, 'resize-from-bottom')

  public handleMouseDown = (event: React.MouseEvent, interactionType: InteractionType) => {
    if (this.state.interaction.type === 'none'){
      const data: InteractionData = {
        isPristine: true,
        dragStartX: event.pageX,
        dragStartY: event.pageY,
        mouseX: event.pageX,
        mouseY: event.pageY,
      }
      switch (interactionType) {
        case 'drag':
          this.setState({ interaction: { type: 'drag', data } })
          break
        case 'resize-from-top':
          this.setState({ interaction: { type: 'resize-from-top', data } })
          break
        case 'resize-from-bottom':
          this.setState({ interaction: { type: 'resize-from-bottom', data } })
          break
      }
      window.addEventListener('mouseup', this.handleMouseUp)
    }
  }
  public handleMouseMove = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        if (this.state.interaction.type === 'drag') {

        }
        if (this.state.interaction.type === 'resize-from-top') {

        }
        if (this.state.interaction.type === 'resize-from-bottom') {

        }
        this.ticking = false
      })
      this.ticking = true
    }
  }
  public handleMouseUp = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    window.removeEventListener('mouseup', this.handleMouseUp)
    if (this.state.interaction.type === 'drag' || this.state.interaction.type === 'resize-from-top' || this.state.interaction.type === 'resize-from-bottom') {
    }
  }
  render () {
    const {visit, hourOffset} = this.props;
    const hour = visit.date.hour()
    const minutes = visit.date.minutes()
    const offset = (hour-hourOffset)*PIXELS_PER_HOUR + minutes*PIXELS_PER_MINUTE
    return(
      <EventWrapper top={offset} height={PIXELS_PER_HOUR*4}>
        <div>{visit ? visit.mourners.length: 0} Mourners</div>
        <div>{visit ? visit.visitors.length: 0} Visitors</div>
      </EventWrapper>
    )   
  }
}
