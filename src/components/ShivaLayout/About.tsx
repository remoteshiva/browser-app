import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { updateShiva } from '../../store/shiva/actions'
import DeleteIcon from '../../assets/img/delete.svg'
import Editable from '../Editable'
import { Row, FlexColumn, FixedColumn } from '../flexLayout'
import { ShivaPanel, withPanel } from './Panel'
import { PhotoDropzoneWrapper } from './styles'

const ImageContainer = styled.div`
  position: relative;
  img {
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .delete {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background-color: ${props => props.theme.colors.desertStorm};
    background-image: url(${DeleteIcon});
    background-size: 15px 15px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    &:focus {
      outline: 0;
    }
  }
`

const PhotoDropzone = () => {
  return <PhotoDropzoneWrapper />
}

const About = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `You can use this space to include an obituary, eulogies, and stories you’d like to share about ${shiva.nameOfDeceased}. If you do not include any information, this component will not appear on the visitor page.`
  const dispatch = useDispatch()
  const [about, setAbout] = useState(shiva.about)
  const [images, setImages] = useState(shiva.images)
  useEffect(() => {
    const partialShiva = { about }
    dispatch(updateShiva(shiva._id, partialShiva))
  }, [save, dispatch, about, shiva._id])
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAbout(event.target.value)
  }
  const handleDeleteImage = (index: number) => {
    setImages([...images.filter((m, i) => i !== index)])
  }
  return (
    <>
      <h2>About {shiva.nameOfDeceased}</h2>
      <Row>
        <FlexColumn>
          <Editable className={`${editing ? 'active' : ''} about`} html={about || editing ? '' : instructions} active={editing || false} onInput={handleInput} />
        </FlexColumn>
        <FixedColumn width={20} />
        <FixedColumn width={290}>
          {images.map((img, index) => (
            <ImageContainer key={index}>
              <img src={img.toString()} alt="the deceased" />
              {editing ? (
                <button
                  className="delete"
                  onClick={() => {
                    handleDeleteImage(index)
                  }}
                />
              ) : null}
            </ImageContainer>
          ))}
          <PhotoDropzone />
        </FixedColumn>
      </Row>
    </>
  )
}

export default withPanel(About)
