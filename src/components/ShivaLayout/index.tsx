import React from 'react'
import { Shiva } from '../../store/shiva/types'
import CopyIcon from '../../assets/img/copy.svg'
import { VerticalSpace } from '../common'
import { Row, FlexColumn, FixedColumn} from '../flexLayout'
import Calendar from '../Calendar'
import {
  LayoutWrapper,
  Card,
  Direction,
  TitleImage,
  ShivaTitle,
  Button,
  MournerName,
  Relationship,
  Note
} from './styles'


interface Props {
  shiva: Shiva
  role: 'Editor' | 'Mourner' | 'Visitor'
}

const ShivaLayout = ({shiva, role}: Props) => {
  return (
    <LayoutWrapper>
      <Row>
        <FlexColumn>
          <Card>
            <Row>
              <FixedColumn width={200}>
                <TitleImage style={{backgroundImage: `url(${shiva.titleImage?.toString()})`}}/>
              </FixedColumn>
              <FlexColumn>
                <ShivaTitle>Shiva for {shiva?.nameOfDeceased} Z"L</ShivaTitle>
                <p>{shiva.message}</p>
              </FlexColumn>
            </Row>
          </Card>
          <Card direction={Direction.column}>
            <h2>Attend the shiva</h2>
            <p>Click on a slot to see who is planning to attend and to indicate when you plan to stop by.</p>
            <Calendar 
              startDate={shiva.startDate}
              endDate={shiva.endDate}
              visits={shiva.visits}
              editMode={false}
            />
          </Card>
          <Card>
            <h1>About {shiva.nameOfDeceased}</h1>
          </Card>
        </FlexColumn>
        <FixedColumn width={20}></FixedColumn>
        <FixedColumn width={320}>
          <Button>Invite visitors</Button>
          <Card direction={Direction.column}>
            <h2>Video link</h2>
            <a href={shiva.videoLink?.toString()}>{shiva.videoLink?.toString()}</a>
          </Card>
          <Card direction={Direction.column}>
            <h2>Mourners</h2>
            <ul>
              {shiva.mourners.map((m, i) => (
                <li style={{display: 'flex', flexDirection: 'row'}} key={i}><MournerName>{m.name}</MournerName><Relationship>{m.relationship}</Relationship></li>
              ))}
            </ul>
            <VerticalSpace height={10}/>
            <button><img style={{display: 'inline'}} src={CopyIcon} alt='copy'/>Copy invite link</button>
            <VerticalSpace height={10}/>
            <Note>Note: Anyone who accesses the shiva through this link will be able to edit.</Note>
          </Card>
          <Card direction={Direction.column}>
            <h2>Minian times</h2>
            <p>The times will be the same for every day except none on Shabbat.</p>
            <p>Shacharit: 8:30</p>
            <p>Mincha: 5:00 pm</p>
            <p>Maariv: 6:00 pm</p>
            <p>You can attend the shiva minyan via Zoom at this link:</p>
            <a href={shiva.videoLink?.toString()}>{shiva.videoLink?.toString()}</a>
          </Card>
          <Card>
            <h2>Meal signups</h2>
          </Card>
          <Card>
            <h2>Memorial donations</h2>
          </Card>
        </FixedColumn>
      </Row>
    </LayoutWrapper>
  )
}

export default ShivaLayout