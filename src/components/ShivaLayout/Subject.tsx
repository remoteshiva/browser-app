import React from 'react'
import styled from 'styled-components'
import Camera from '../../assets/img/camera.svg'
import { Row, FlexColumn, FixedColumn } from '../flexLayout'
import { ShivaPanel, withPanel } from './Panel'

const SubjectImageContainer = styled.div`
  background-position: 50% 50%;
  background-repeat: no-repeat;
  border-radius: 50%;
  overflow: hidden;
  width: 142px;
  height: 142px;
  margin: 20px auto;
`
export const EmptySubjectImage = styled(SubjectImageContainer)`
  background-image: url(${Camera});
  background-size: 66px 56px;
  background-color: ${props => props.theme.colors.sauvignon};
  border: 2px dashed ${props => props.theme.colors.clamShell};
`

export const SubjectImage = styled(SubjectImageContainer)`
  border: 6px solid ${props => props.theme.colors.romance};
  background-size: cover;
`
export const Title = styled.div`
  /* flex-shrink:0 !important; */
  min-width: 40%;
  font-size: 48px;
  font-family: 'Lora';
  color: ${props => props.theme.colors.heavyMetal};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Subject = ({ shiva, editing }: ShivaPanel) => {
  const renderView = () => (
    <>
      <Row>
        <FixedColumn width={200}>{shiva.titleImage ? <SubjectImage style={{ backgroundImage: `url(${shiva.titleImage?.toString()})` }} /> : <EmptySubjectImage />}</FixedColumn>
        <FlexColumn>
          <Title>Shiva for {shiva?.nameOfDeceased} Z"L</Title>
          <p>{shiva.message}</p>
        </FlexColumn>
      </Row>
    </>
  )
  const renderEdit = () => <>edit mode</>
  return <>{editing ? renderEdit() : renderView()}</>
}

export default withPanel(Subject)
