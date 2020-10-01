import React, { useState } from 'react'
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
import InviteVisitors from './InviteVisitors'
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
  const [showDialog, setShowDialog] = useState(false)
  const DARK = true
  return (
    <LayoutWrapper>
      <Row>
        <main>
          <FlexColumn>
            <Subject shiva={shiva} darkMode={false} role={role} direction={Direction.row}/>
            <Schedule shiva={shiva} darkMode={false} role={role} direction={Direction.column}/>
            <About shiva={shiva} darkMode={DARK} role={role} direction={Direction.column}/>
          </FlexColumn>
        </main>
        <aside style={{marginLeft: '20px'}}>
          <FixedColumn width={320}>
            { role !== 'Visitor' ? <Button onClick={() => setShowDialog(true)}>Invite visitors</Button> : null }
            <VideoLink shiva={shiva} darkMode={shiva.videoLink ? false: true} role={role} direction={Direction.column}/>
            <Mourners shiva={shiva} darkMode={false} role={role} direction={Direction.column}/>
            <MinianTimes shiva={shiva} darkMode={DARK} role={role} direction={Direction.column}/>
            <Meals shiva={shiva} darkMode={DARK} role={role} direction={Direction.column}/>
            <Donations shiva={shiva} darkMode={DARK} role={role} direction={Direction.column}/>
          </FixedColumn>
        </aside>
      </Row>
      { showDialog ? <InviteVisitors shiva={shiva} onClose={()=>setShowDialog(false)}/> : null }
    </LayoutWrapper>
  )
}

export default ShivaLayout