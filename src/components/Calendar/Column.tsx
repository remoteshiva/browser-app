import React, { PureComponent } from 'react'
import * as Moment from 'moment'
import { extendMoment } from 'moment-range'
import { Visit, Mourner } from '../../store/shiva/types'
import { withCalendarContext, CalendarContextProps } from './context'
import { CalendarEvent, NewEvent } from './event'
import { ColumnWrapper, PIXELS_PER_MINUTE, PIXELS_PER_HOUR, SNAP, Pixels } from './styles'

const moment = extendMoment(Moment)
const noop = () => {}

const pixelToMinutes = (offset: number) => (pixel: number) => offset + pixel / PIXELS_PER_MINUTE

interface Props extends CalendarContextProps {
  editMode: boolean
  day: moment.Moment
  visits: Visit[]
  mourners?: Mourner[]
  scrollYOffset: Pixels
}

interface State {
  newVisit: Visit | null
  top: Pixels | null
  bottom: Pixels
}

class Column extends PureComponent<Props, State> {
  private rafBusy: boolean = false // the requestAnimationFrame "busy" status

  constructor(props: Props) {
    super(props)
    this.state = {
      newVisit: null,
      top: null,
      bottom: 0,
    }
  }
  public handleMouseDown = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement
    var rect = target.getBoundingClientRect()
    console.log(this.props.scrollYOffset, rect.top, 'page', event.pageY, 'client', event.clientY)
    const minutes = pixelToMinutes(9 * 60)(event.clientY + rect.top - this.props.scrollYOffset)
    console.log('minutes', minutes)
    const ts = this.props.day.clone().add(minutes, 'minutes')
    const newVisit: Visit = {
      date: ts,
      length: 4,
      mourners: [],
      visitors: [],
    }
    this.setState({ newVisit, top: event.pageY - rect.top })
    window.addEventListener('mouseup', this.handleMouseUp)
  }
  public handleMouseMove = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.persist()
    if (!this.rafBusy) {
      const top = this.state.top
      window.requestAnimationFrame(() => {
        if (top) {
          const target = event.target as HTMLTextAreaElement
          var rect = target.getBoundingClientRect()
          var bottom = event.pageY - rect.top
          this.setState({ bottom: bottom > SNAP ? bottom : SNAP })
        }
        this.rafBusy = false
      })
      this.rafBusy = true
    }
  }
  public handleMouseUp = (event: MouseEvent) => {
    // call up with the new event
    this.setState({ newVisit: null, top: null, bottom: 0 })
    window.removeEventListener('mouseup', this.handleMouseUp)
  }
  render() {
    const { editMode, day, startHour, endHour } = this.props
    const height = (endHour - startHour) * PIXELS_PER_HOUR + 1
    return (
      <ColumnWrapper height={`${height}px`} onMouseDown={editMode ? this.handleMouseDown : noop} onMouseMove={editMode ? this.handleMouseMove : noop}>
        {this.props.visits
          .filter(visit => visit.date.calendar() === day.calendar())
          .map((visit, i) => (
            <CalendarEvent key={i} hourOffset={this.props.startHour} visit={visit} />
          ))}
        {this.state.top ? <NewEvent top={this.state.top} bottom={this.state.bottom} /> : null}
      </ColumnWrapper>
    )
  }
}
export default withCalendarContext(Column)
