import React, { useState } from "react";
import {DropdownContainer, DropdownItem, DropdownWrapper, DropdownButton} from './styles'
import MenuHandle from '../../assets/img/shiva-menu.svg'

const Dropdown = () => {
  const [isActive, setActive] = useState(false);

  const handleDropdownClick = () => setActive(!isActive);

  const handleMenuClick = (index: number) => {
    console.log(menu[index])
    setActive(false)
  }

  const menu = [
    {id:1, caption:'Copy link for mourners'},
    {id:2, caption:'Copy link for visitors'},
    {id:3, caption:'Edit'},
    {id:4, caption:'Duplicate'},
    {id:5, caption:'Delete', props: {color: '#c82323'}},
  ]

  return(
    <DropdownWrapper 
      onClickOutside={()=> setActive(false) }
    >
      <div className='content-end'>
        <DropdownButton onClick={handleDropdownClick}>
          <img className="hidden lg:block w-auto" src={MenuHandle} alt="menu"/>
        </DropdownButton>
      </div>
      <DropdownContainer visible={isActive}>
        <div>
          {
            menu.map((item, index) => (<DropdownItem
              key={item.id}
              onClick={()=> handleMenuClick(index)}
              {...item.props}>
                {item.caption}
              </DropdownItem>)
            )
          }
        </div>
      </DropdownContainer>
    </DropdownWrapper>
  )
}

export default Dropdown

