import React, { PureComponent } from 'react'
import * as Moment from 'moment'
import { extendMoment } from 'moment-range'
import { Visit, Mourner } from '../../store/shiva/types'
import { CalendarEvent, NewEvent } from './event'
import { withCalendarContext, CalendarContextProps } from './context'
import { 
    ColumnWrapper,
    GridWrapper,
    PIXELS_PER_MINUTE,
    SNAP,
    Pixels
  } from './styles'

const moment = extendMoment(Moment);
const noop = () => {}

interface ColumnProps  extends CalendarContextProps{
  editMode: boolean
  day: moment.Moment
  visits: Visit[]
  mourners?: Mourner[]
}
interface ColumnState {
  newVisit: Visit | null
  top: Pixels | null
  bottom: Pixels
}

const pixelToMinutes = (offset: number) => (pixel: number) => (offset + pixel / PIXELS_PER_MINUTE)



class Column extends PureComponent<ColumnProps, ColumnState> {
  private rafBusy: boolean = false // the requestAnimationFrame "busy" status

  constructor(props: ColumnProps) {
    super(props)
    this.state = {
      newVisit: null,
      top: null,
      bottom: 0
    }
  }
  public handleMouseDown = (event: React.MouseEvent) => {
    const target = event.target as HTMLTextAreaElement;
    var rect = target.getBoundingClientRect();
    const minutes = pixelToMinutes(9*60)(event.pageY - rect.top)
    const ts = this.props.day.clone().add(minutes, 'minutes')
    const newVisit:Visit = {
      date: ts,
      length: 4,
      mourners: [],
      visitors: [],
    }
    this.setState({newVisit, top: event.pageY - rect.top})
    window.addEventListener('mouseup', this.handleMouseUp)
  }
  public handleMouseMove = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.persist()
    if (!this.rafBusy) {
      const top = this.state.top
      window.requestAnimationFrame(() => {
        if(top) {
          const target = event.target as HTMLTextAreaElement;
          var rect = target.getBoundingClientRect();
          var bottom = event.pageY-rect.top
          this.setState({bottom: (bottom > SNAP ? bottom: SNAP)})
        }
        this.rafBusy = false
      })
      this.rafBusy = true
    }
  }
  public handleMouseUp = (event: MouseEvent) => {
    // call up with the new event
    this.setState({newVisit:null, top: null, bottom: 0})
    window.removeEventListener('mouseup', this.handleMouseUp)
  }
  render() {
    const { editMode, day } = this.props
    return(
      <ColumnWrapper 
        onMouseDown={editMode ? this.handleMouseDown: noop}
        onMouseMove={editMode ? this.handleMouseMove: noop}
      >
        {this.props.visits.filter(
          visit => visit.date.calendar()===day.calendar()
        ).map(
          (visit,i) => <CalendarEvent key={i} hourOffset={this.props.startHour} visit={visit}/>
        )}
        {this.state.top ? <NewEvent top={this.state.top} bottom={this.state.bottom}/> : null}
      </ColumnWrapper>
    )
  }
}
const ColumnWithContext = withCalendarContext(Column)

interface GridProps {
  editMode: boolean
  startDate: moment.Moment
  numOfDays: number
  visits: Visit[]
}
export const Grid = ({editMode, startDate, numOfDays, visits}: GridProps) => {
  const columnDays = Array.from({length: numOfDays}, (_, i) => startDate.clone().add(i, 'days'))
  return(
    <GridWrapper numOfColumns={numOfDays}>
      { columnDays.map((day, i) => (<ColumnWithContext key={i} editMode={editMode} day={day} visits={visits}/>)) }
    </GridWrapper>
)}

