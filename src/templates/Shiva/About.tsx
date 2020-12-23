import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { patchSelectedShiva } from '../../services/shiva'
import DeleteIcon from '../../assets/img/delete.svg'
import Editable from '../../components/Editable'
import PhotoDropzone from '../../components/Dropzone'
import { Row, FlexColumn, FixedColumn } from '../../components/flexLayout'
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
    bottom: 20px;
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

const About = ({ shiva, editing, save }: ShivaPanel) => {
  const instructions = `You can use this space to include an obituary, eulogies, and stories you’d like to share about ${shiva.nameOfDeceased}. If you do not include any information, this component will not appear on the visitor page.`
  const dispatch = useDispatch()
  const [about, setAbout] = useState(shiva.about)
  const [images, setImages] = useState<URL[]>(shiva.images)
  const [uploading, setUploading] = useState(false)
  useEffect(() => {
    if (save && save > 0) {
      const partialShiva = { about, images }
      dispatch(patchSelectedShiva(partialShiva))
    }
  }, [about, dispatch, images, save])
  const handleInput = (html: string) => {
    setAbout(html)
  }
  const handleDeleteImage = (index: number) => {
    setImages([...images.filter((m, i) => i !== index)])
  }
  const handleImageUploading = () => {
    setUploading(true)
  }
  const handImageUploaded = (url: string) => {
    setImages(ims => [...ims, new URL(url)])
    setUploading(false)
  }
  return (
    <>
      <h2>About {shiva.nameOfDeceased}</h2>
      <Row>
        <FlexColumn>
          <Editable className={`${editing ? 'active' : ''} about`} html={about || (editing ? '' : instructions)} active={editing || false} onInput={handleInput} />
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
          {editing ?
          <PhotoDropzoneWrapper className={uploading? 'uploading': ''}>
            <PhotoDropzone
              onImageUploading={handleImageUploading}
              onImageUploaded={handImageUploaded}
              active={editing || false}
            />
          </PhotoDropzoneWrapper> : null }
        </FixedColumn>
      </Row>
    </>
  )
}

export default withPanel(About)
