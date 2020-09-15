import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { Shiva as ShivaModel } from '../../store/shiva/types'
import  { ShivaItemWrapper, ShivaDates } from './styles'
import Dropdown, { MenuItem } from './dropdown'


interface ShivaProps extends ShivaModel {
}

const menu: MenuItem[] = [
  {id:1, text:'Copy link for mourners'},
  {id:2, text:'Copy link for visitors'},
  {id:3, text:'Edit'},
  {id:4, text:'Duplicate'},
  {id:5, text:'Delete', props: {color: '#c82323'}},
]


const ShivaItem = ({
  nameOfDeceased,
  startDate,
  endDate=startDate.clone().add('days', 6)
}:ShivaProps) => {
  const dispatch = useDispatch()

  const handleMenuClick = (menu: MenuItem) => {
    switch(menu.id){
      case 1: // handle copy link for mourners
        break;
      case 2: // handle copy link for visitors
        break;
      case 3: // navigate to shiva edit page
        dispatch(push(`/shiva/${menu.id}`))
        break;
      case 4: // duplicate shiva
        break;
      case 5: // delete shiva
        break;
    }
  }  
  return (
    <ShivaItemWrapper>
      <div className='w-full' style={{height: '33px', overflow: 'visible'}}>
        <Dropdown menu={menu} menuClickHandler={handleMenuClick}/>
      </div>
      <div className="flex content-end flex-wrap h-48">
        <p>{nameOfDeceased}</p>
        <ShivaDates>{startDate.format('L')} - {endDate.format('L')}</ShivaDates>
      </div>
    </ShivaItemWrapper>
    )
}
export default ShivaItem