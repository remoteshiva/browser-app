import styled from 'styled-components'
import Camera from '../../assets/img/camera.svg'

export const LayoutWrapper = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.colors.sauvignon};
  a {
    color: ${props => props.theme.colors.blueChill};
    font-size: 16px;
  }
`

export enum Direction {
  row = 'row',
  column = 'column',
}
interface CardWrapperProps {
  direction?: Direction
}
export const CardWrapper = styled.div<CardWrapperProps>`
  display: flex;
  position: relative;
  flex-direction: ${props => (props.direction ? props.direction : 'row')};
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.04);
  .editable {
    line-height: 1.5;
    display: block;
    &.subject,
    &.active {
        border-bottom: 1px dashed ${props => props.theme.colors.blueChill};
      }
    &.subject,
    &.about {
      min-height: 174px;
      width: 100%;
      &.active {
        border-radius: 8px;
        border: 1px solid ${props => props.theme.colors.blackHaze};
        padding: 12px;
      }
    }
    &.video-link {
      color: ${props => props.theme.colors.blueChill};
      &[contenteditable='false'] {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &.active {
        border-bottom: 1px dashed ${props => props.theme.colors.blueChill};
      }
    }
    &.invalid {
      color: ${props => props.theme.colors.cardinal};
    }
  }
  &.darkMode {
    background-color: ${props => props.theme.colors.sauvignonLight};
    border: 2px dashed ${props => props.theme.colors.clamShell};
    h2 {
      color: ${props => props.theme.colors.doveGray};
    }
    .editable {
      color: ${props => props.theme.colors.dawn};
      font-family: 'Lato';
      font-size: 16px;
      line-height: 1.5;
      &.about {
        height: 174px;
        padding: 12px;
        border: 2px dashed ${props => props.theme.colors.clamShell};
        border-radius: 10px;
      }
    }
  }
  h2 {
    font-family: 'Lora';
    font-size: 28px;
    width: 100%;
    color: ${props => props.theme.colors.heavyMetal};
    margin-bottom: 12px;
    word-wrap: normal;
  }
  h4 {
    font-family: 'Lato';
    font-size: 16px;
    margin-bottom: 20px;
  }
  p {
    color: ${props => props.theme.colors.heavyMetal};
    font-family: 'Lora';
    font-size: 16px;
  }
`
// TODO: get rid of this
export const Button = styled.button`
  background-color: ${props => props.theme.colors.richGold};
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  width: 100%;
`

export const MournerName = styled.div`
  flex: 1;
  font-family: 'Lato';
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Relationship = styled.div`
  flex: 1;
  font-weight: 100;
  font-style: italic;
  color: ${props => props.theme.colors.doveGray};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Note = styled.div`
  color: ${props => props.theme.colors.doveGray};
  font-size: 13px;
  font-family: 'Lato';
`

export const PhotoDropzoneWrapper = styled.div`
  background-image: url(${Camera});
  background-size: 66px 56px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-color: ${props => props.theme.colors.sauvignonLight};
  border: 2px dashed ${props => props.theme.colors.clamShell};
  border-radius: 10px;
  width: 292px;
  height: 174px;
  animation: none;
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
    }
    100% {
      box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
    }
  }
  &.uploading {
    animation: pulse 2s infinite;
  }
`
