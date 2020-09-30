import React from 'react'
import { Shiva, ROLE } from '../../store/shiva/types'
import { Row, FlexColumn, FixedColumn} from '../flexLayout'
import Subject from './Subject'
import About from './About'
import Schedule from './Schedule'
import Mourners from './Mourners'
import VideoLink from './VideoLink'
import MinianTimes from './MinianTimes'
import Meals from './Meals'
import Donations from './Donations'
import {
  LayoutWrapper,
  Direction,
  Button
} from './styles'


interface Props {
  shiva: Shiva
  role: ROLE
}

const ShivaLayout = ({shiva, role}: Props) => {
  return (
    <LayoutWrapper>
      <Row>
        <main>
          <FlexColumn>
            <Subject shiva={shiva} role={role} direction={Direction.row}/>
            <Schedule shiva={shiva} role={role} direction={Direction.column}/>
            <About shiva={shiva} role={role} direction={Direction.column}/>
          </FlexColumn>
        </main>
        <FixedColumn width={20}></FixedColumn> 
        <aside>
          <FixedColumn width={320}>
            { role !== 'Visitor' ? <Button>Invite visitors</Button> : null }
            <VideoLink shiva={shiva} role={role} direction={Direction.column}/>
            <Mourners shiva={shiva} role={role} direction={Direction.column}/>
            <MinianTimes shiva={shiva} role={role} direction={Direction.column}/>
            <Meals shiva={shiva} role={role} direction={Direction.column}/>
            <Donations shiva={shiva} role={role} direction={Direction.column}/>
          </FixedColumn>
        </aside>
      </Row>
    </LayoutWrapper>
  )
}

export default ShivaLayout