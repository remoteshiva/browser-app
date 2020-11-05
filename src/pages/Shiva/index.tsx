import React, { useEffect, useState } from 'react'
import { push } from 'connected-react-router'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import * as Routes from '../../routes'
import { RootState, AppDispatch } from '../../store'
import CloseIcon from '../../assets/img/closex.svg'
import { ApproveButton, VerticalSpace } from '../../components/common'
import { ClickOutside } from '../../components/ClickOutside'
import { fetchShivaById } from '../../services/shiva'
import { selectShiva } from '../../store/shiva/actions'
import ShivaTemplate from '../../templates/Shiva'
import Loading from '../../components/Loading'

const Fade = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(65, 65, 58, 0.6);
  z-index: 1000;
`
const Modal = styled(ClickOutside)`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.sauvignonLight};
  border-radius: 10px;
  z-index: 2010;
  width: 630px;
  height: 548px;
  padding: 48px 78px;
  text-align: center;
  color: ${props => props.theme.colors.heavyMetal};
  h2 {
    font-family: 'Lora';
    font-size: 56px;
    color: ${props => props.theme.colors.heavyMetal};
    margin-bottom: 30px;
  }
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    background-image: url(${CloseIcon});
    width: 20px;
    height: 20px;
  }
`

interface RoutingProps {
  id: string
}

type HistoryLocationState = {
  newShiva: boolean
}

const ShivaPage = () => {
  const history = useHistory<HistoryLocationState>()
  const [displayDialog, setDisplayDialog] = useState(history.location.state ? history.location.state.newShiva : false)
  const { id } = useParams<RoutingProps>()
  const { loading, entities, selectedShiva } = useSelector((state: RootState) => state.shiva)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetch = async () => {
      try {
        const { id: shivaId } = await dispatch(fetchShivaById(id))
        dispatch(selectShiva(shivaId))
      } catch (error) {
        console.log('Failed to fetch Shiva', error)
        dispatch(push(Routes.NOT_FOUND))
      }
    }
    if (id in entities) {
      dispatch(selectShiva(id))
    } else {
      fetch()
    }
  }, [dispatch, entities, id])

  return loading || !selectedShiva || !(selectedShiva in entities) ? (
    <Loading />
  ) : (
    <>
      <ShivaTemplate role="Editor" shiva={entities[selectedShiva]} />
      {displayDialog ? (
        <Fade>
          <Modal onClickOutside={() => setDisplayDialog(false)}>
            <button className="close" onClick={() => setDisplayDialog(false)}></button>
            <h2>Setup successful</h2>
            <p>
              Your shiva is now live. Take a look at components with dotted lines to see more details that you can add to your shiva page, like an About the Deceased section and links to a meal sign
              up and memorial donations.
            </p>
            <br />
            <p>Remember to update the mourner attendance on the calendar; by default, all mourners appear as attending all visiting hours.</p>
            <VerticalSpace height={50} />
            <div>
              <ApproveButton onClick={() => setDisplayDialog(false)}>Got it, thanks</ApproveButton>
            </div>
          </Modal>
        </Fade>
      ) : null}
    </>
  )
}

export default ShivaPage
