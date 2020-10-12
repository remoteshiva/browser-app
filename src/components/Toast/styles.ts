import styled, { keyframes } from 'styled-components'

const toastInRight = keyframes`
	from {
	  transform: translateX(100%);
	}
	to {
	  transform: translateX(0);
	}
`

const toastInLeft = keyframes`
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(0);
	}
`

export const Container = styled.div`
  font-size: 14px;
  box-sizing: border-box;
  position: fixed;
  z-index: 1000;
  &.tr {
    top: 12px;
    right: 12px;
    transition: transform 0.6s ease-in-out;
    animation: ${toastInRight} 0.7s;
  }
  &.br {
    bottom: 12px;
    right: 12px;
    transition: transform 0.6s ease-in-out;
    animation: ${toastInRight} 0.7s;
  }
  &.tl {
    top: 12px;
    left: 12px;
    transition: transform 0.6s ease-in;
    animation: ${toastInLeft} 0.7s;
  }
  &.bl {
    bottom: 12px;
    left: 12px;
    transition: transform 0.6s ease-in;
    animation: ${toastInLeft} 0.7s;
  }
`

export const NotificationWrapper = styled.div`
  background: ${props => props.theme.colors.woodBark};
  opacity: 0.9;
  transition: 0.3s ease;
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  margin: 0 0 6px;
  padding: 10px 50px;
  margin-bottom: 15px;
  width: 323px;
  max-height: 93px;
  border-radius: 14px;
  box-shadow: 0 0 10px ${props => props.theme.colors.woodBark};
  color: #fff;
  background-position: 15px;
  background-repeat: no-repeat;
  font-family: 'Lato';
  &:hover {
    box-shadow: 0 0 12px ${props => props.theme.colors.woodBark};
    opacity: 1;
    cursor: pointer;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    line-height: normal;
  }
  .description {
    font-size: 14px;
    line-height: normal;
  }
  .icon {
    position: absolute;
    left: 15px;
  }
`
