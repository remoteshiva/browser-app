import React from 'react'
import styled from 'styled-components'
import Camera from '../../assets/img/camera.svg'
import { Row, FlexColumn, FixedColumn } from '../flexLayout'
import { ShivaPanel, withPanel } from './Panel'


export const EmptySubjectImage = styled.div`
  background-image: url(${Camera});
  background-size: 66px 56px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-color: ${props => props.theme.colors.sauvignon };
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 30px;
  width: 142px;
  height: 142px;
  border-radius: 50%;
  border: 2px dashed ${props => props.theme.colors.clamShell };
  overflow: hidden;
`

export const SubjectImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 6px solid ${props=> props.theme.colors.romance};
  overflow: hidden;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
`
export const Title = styled.div`
  /* flex-shrink:0 !important; */
  min-width: 40%;
  font-size: 48px;
  font-family: 'Lora';
  color: ${props=> props.theme.colors.heavyMetal};
  text-overflow: ellipsis;
  overflow: hidden; 
  white-space: nowrap;
`

const Subject = ({shiva, editing}: ShivaPanel) => {
  const renderView = () =>(
    <>
      <Row>
        <FixedColumn width={200}>
          {/* <SubjectImage style={{backgroundImage: `url(${shiva.titleImage?.toString()})`}}/> */}
          <EmptySubjectImage/>
        </FixedColumn>
        <FlexColumn>
          <Title>Shiva for {shiva?.nameOfDeceased} Z"L</Title>
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