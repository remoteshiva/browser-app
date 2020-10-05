import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as Routes from '../../routes'
import NotFoundImage from '../../assets/img/page-not-found.svg'
import { Row } from '../../components/flexLayout'
import { VerticalSpace, DarkButton } from '../../components/common'

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 670px;
    height: 270px;
  }
  h2 {
    margin-top: 57px;
    margin-bottom: 30px;
    font-size: 43px;
    font-family: 'Lora';
    color: ${props => props.theme.colors.heavyMetal};
  }
`

const NotFound = () => (
  <Wrapper>
    <VerticalSpace height={100} />
    <Row>
      <img src={NotFoundImage} alt="Not Found" />
    </Row>
    <Row>
      <h2>Page Not Found</h2>
    </Row>
    <Row>
      <p>Hmm, it seems that page does not exist.</p>
    </Row>
    <VerticalSpace height={40} />
    <Row>
      <Link to={Routes.MY_SHIVAS}>
        <DarkButton>Go Home </DarkButton>
      </Link>
    </Row>
    <VerticalSpace height={200} />
  </Wrapper>
)

export default NotFound
