import React from 'react'
import { Row, FlexColumn, FixedColumn } from '../flexLayout'
import { ShivaPanel, withPanel } from './Panel'
import { TitleImage, ShivaTitle } from './styles'

const Subject = ({shiva, editing}: ShivaPanel) => {
  const renderView = () =>(
    <>
      <Row>
        <FixedColumn width={200}>
          <TitleImage style={{backgroundImage: `url(${shiva.titleImage?.toString()})`}}/>
        </FixedColumn>
        <FlexColumn>
          <ShivaTitle>Shiva for {shiva?.nameOfDeceased} Z"L</ShivaTitle>
          <p>{shiva.message}</p>
        </FlexColumn>
      </Row>
    </>
  )
  const renderEdit = () => (
    <>
      edit mode
    </>
  )
  return (
    <>{editing? renderEdit() : renderView()}</>
  )
}

export default withPanel(Subject)