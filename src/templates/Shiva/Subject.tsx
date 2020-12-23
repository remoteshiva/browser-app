import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { patchSelectedShiva } from '../../services/shiva'
import { addNotification } from '../../store/app/actions'
import Camera from '../../assets/img/camera.svg'
import EditIcon from '../../assets/img/editWhite.svg'
import PhotoDropzone from '../../components/Dropzone'
import Editable from '../../components/Editable'
import { Row, FlexColumn, FixedColumn } from '../../components/flexLayout'
import { ShivaPanel, withPanel } from './Panel'
import { initializeNotification } from '../../store/app/types'


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
  const dispatch = useDispatch();
  const [message, setMessage] = useState(shiva.message);
  const [titleImage, setTitleImage] = useState(shiva.titleImage);

  useEffect(() => {
    const saveShiva = async () => {
      if (save && save > 0) {
        const partialShiva = { message, titleImage }
        console.log('saving partial shiva', partialShiva)
        try {
          dispatch(patchSelectedShiva(partialShiva))
        } catch (error) {
          dispatch(addNotification(initializeNotification({
            title: 'Failed to save Shiva',
            description: error.code,
            type: 'error'
          })))
        }
      }
    };
    saveShiva();
  }, [dispatch, message, save, titleImage]);
  const handleInput = (html: string) => {
    setMessage(html)
  };
  const handleImageUploading = () => {

  }
  const handImageUploaded = (url: string) => {
    const newTitleImage = new URL(url)
    setTitleImage(newTitleImage)
    const partialShiva = { titleImage: newTitleImage }
    dispatch(patchSelectedShiva(partialShiva))
  }
  const renderSelectImage = (editing: boolean) => (
    <>
      {editing ? (
        <RoundEditClicker src={EditIcon}>
          <PhotoDropzone
            onImageUploading={handleImageUploading}
            onImageUploaded={handImageUploaded}
            active={editing || false}
          />
        </RoundEditClicker>
      ) : null}
    </>
  )
  return (
    <Row>
      <FixedColumn width={180}>
        <Container>
          {titleImage ? (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <SubjectImage style={{ backgroundImage: `url(${titleImage?.toString()})` }} />
              {renderSelectImage(true)}
            </div>
          ) : (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <EmptySubjectImage />
              {renderSelectImage(true)}
            </div>
          )}
        </Container>
      </FixedColumn>
      <FlexColumn>
        <Title>Shiva for {shiva.nameOfDeceased} Z"L</Title>
        <Editable className={`${editing ? 'active' : ''} subject`} html={message || ''} active={editing || false} onInput={handleInput} />
      </FlexColumn>
      </Row>

  )
}

export default withPanel(Subject)
