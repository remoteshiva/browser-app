import React, { useState } from "react";
import {DropdownContainer, DropdownItem, DropdownWrapper, DropdownButton} from './styles'
import MenuHandle from '../../assets/img/shiva-menu.svg'

export interface MenuItem {
  id: number,
  text: string,
  props?: {
    color: string
  }
}

interface Props {
  menu: MenuItem[]
  menuClickHandler: (menu: MenuItem) => void
}
const Dropdown = ({menu, menuClickHandler}: Props) => {
  const [isActive, setActive] = useState(false);

  const handleDropdownClick = () => setActive(!isActive);

  const handleMenuClick = (index: number) => {
    setActive(false)
    menuClickHandler(menu[index])
  }

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
                {item.text}
              </DropdownItem>)
            )
          }
        </div>
      </DropdownContainer>
    </DropdownWrapper>
  )
}

export default Dropdown

