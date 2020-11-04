import styled from 'styled-components'
import CloseIcon from '../../assets/img/closex.svg'

export const PIXELS_PER_HOUR = 40
export const PIXELS_PER_MINUTE = PIXELS_PER_HOUR / 60
export const SNAP = 15
export type Pixels = number

export const VisitWrapper = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 90%;
  margin: 0 5% 0 5%;
  background-color: rgba(146, 70, 35, 0.12);
  font-family: 'Lato';
  font-size: 13px;
  padding: 10px;
  cursor: pointer;
  overflow: hidden;
  color: ${props => props.theme.colors.richGold};
  > div {
    font-family: 'Lato';
    font-size: 13px;
    line-height: 18px;
  }
  .close {
    background: url(${CloseIcon}) center center no-repeat;
    background-size: 8px 8px;
    position: absolute;
    top: 5px;
    right: 5px;
    width: 8px;
    height: 8px;
  }
  .gripper {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    max-width: 25px;
    height: 3px;
    border-radius: 1.5px;
    background-color: ${props => props.theme.colors.cottonSeed};
    opacity: 0.62;
    cursor: row-resize;
  }
  .gripper-top {
    top: 5px;
  }
  .gripper-bottom {
    bottom: 5px;
  }
`
