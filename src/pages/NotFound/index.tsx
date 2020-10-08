import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as Routes from '../../routes'
import NotFoundImage from '../../assets/img/page-not-found.svg'
import { Row } from '../../components/flexLayout'
import { VerticalSpace, DarkButton } from '../../components/common'

const Center = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
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
  <>
    <VerticalSpace height={100} />
    <Row>
      <Center>
        <img src={NotFoundImage} alt="Not Found" />
      </Center>
    </Row>
    <Row>
      <Center>
        <h2>Page Not Found</h2>
      </Center>
    </Row>
    <Row>
      <Center>
        <p>Hmm, it seems that page does not exist.</p>
      </Center>
    </Row>
    <VerticalSpace height={40} />
    <Row>
      <Center>
        <Link to={Routes.MY_SHIVAS}>
          <DarkButton>Go Home </DarkButton>
        </Link>
      </Center>
    </Row>
    <VerticalSpace height={200} />
  </>
)

export default NotFound
