import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { updateShiva } from '../../store/shiva/actions'
import Camera from '../../assets/img/camera.svg'
import EditIcon from '../../assets/img/editWhite.svg'
import PhotoDropzone from '../Dropzone'
import Editable from '../Editable'
import { Row, FlexColumn, FixedColumn } from '../flexLayout'
import { ShivaPanel, withPanel } from './Panel'

const Container = styled.div`
  padding-top: 20px;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SubjectImageContainer = styled.div`
  background-position: 50% 50%;
  background-repeat: no-repeat;
  border-radius: 50%;
  overflow: hidden;
  width: 142px;
  height: 142px;
`
const EmptySubjectImage = styled(SubjectImageContainer)`
  background-image: url(${Camera});
  background-size: 66px 56px;
  background-color: ${props => props.theme.colors.sauvignon};
  border: 2px dashed ${props => props.theme.colors.clamShell};
`

interface RoundClickerProps {
  src: string
}

const SubjectImage = styled(SubjectImageContainer)`
  position: relative;
  border: 6px solid ${props => props.theme.colors.romance};
  background-size: cover;
`
const Title = styled.div`
  min-width: 40%;
  font-size: 48px;
  font-family: 'Lora';
  color: ${props => props.theme.colors.heavyMetal};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const RoundEditClicker = styled.button<RoundClickerProps>`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 34px;
  height: 34px;
  border-radius: 17px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.09);
  background-color: #fff;
  background-image: ${props => `url(${props.src})`};
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 1;
  &:focus {
    outline: 0;
  }
  &:active {
    box-shadow: none;
  }
`

const Subject = ({ shiva, editing, save }: ShivaPanel) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState(shiva.message)
  const [titleImage, setTitleImage] = useState(shiva.titleImage)

  useEffect(() => {
    if (save && save > 0) {
      const partialShiva = { message, titleImage }
      console.log('saving partial shiva', partialShiva)
      dispatch(updateShiva(shiva._id, partialShiva))
    }
  }, [save, dispatch, message, titleImage, shiva._id])
  const handleInput = (html: string) => {
    console.log('incoing data', html)
    setMessage(html)
  }
  const handImageUploaded = (url: string) => {
    setTitleImage(new URL(url))
  }
  const renderSelectImage = (editing: boolean) => (
    <>
      {editing ? (
        <RoundEditClicker src={EditIcon}>
          <PhotoDropzone onImageUploaded={handImageUploaded} active={editing ? editing : false} />
        </RoundEditClicker>
      ) : null}
    </>
  )
  return (
    <>
      <Row>
        <FixedColumn width={180}>
          <Container>
            {titleImage ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <SubjectImage style={{ backgroundImage: `url(${titleImage?.toString()})` }} />
                {renderSelectImage(editing || false)}
              </div>
            ) : (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <EmptySubjectImage />
                {renderSelectImage(editing || false)}
              </div>
            )}
          </Container>
        </FixedColumn>
        <FlexColumn>
          <Title>Shiva for {shiva.nameOfDeceased} Z"L</Title>
          <Editable className={`${editing ? 'active' : ''} subject`} html={message || ''} active={editing || false} onInput={handleInput} />
        </FlexColumn>
      </Row>
    </>
  )
}

export default withPanel(Subject)
