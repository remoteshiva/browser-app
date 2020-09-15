import styled from 'styled-components'
import tw from 'twin.macro'
import { ClickOutside } from '../ClickOutside'


export const ShivaListWrapper = styled.ul`
    display: flex;
    flex-flow: row wrap;
    list-style-type:none;
`

const BaseItemWrapper = styled.li`
    margin-right: 40px;
    margin-bottom: 40px;
    width: ${props => props.theme.components.shivaCard.width};
    height: ${props => props.theme.components.shivaCard.height};
    border-radius: ${props => props.theme.components.shivaCard.borderRadius};
`

export const ShivaItemWrapper = styled(BaseItemWrapper)`
    padding-left: 21px;
    padding-bottom: 36px;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.04);
    background-color: #fff;
    font-family: 'Lora';
    p{
        /* margin-top: 143px; */
        font-size:34px;
        font-weight: 400;
    }
`

export const NewShivaItemWrapper = styled(BaseItemWrapper)` 
${tw`flex items-center justify-center`}
    border-color:${props => props.theme.colors.doveGray}; 
    color:${props => props.theme.colors.doveGray}; 
    border-width: 1px;
    border-style: dashed;
    font-size: 18px;
`

export const ShivaDates = styled.div`
    font-family: 'Lato';
    font-size: 16px;
`

/********* menu *********/
export const DropdownWrapper = styled(ClickOutside)`
    ${tw`flex flex-row-reverse relative`}
    overflow:visible;
`

export const DropdownButton = styled.span`
    ${tw`inline-flex justify-center px-4 py-2 bg-white leading-5 focus:outline-none focus:border-blue-300 transition ease-in-out duration-150`}
    /* ${tw`flex flex-row-reverse`} */
    img{
        width: 6px;
        height: 19px;
        object-fit: contain;
    }
`

interface DropdownContainerProps {
    readonly visible: boolean
}

export const DropdownContainer = styled.div<DropdownContainerProps>`
    ${tw`origin-top-right absolute rounded-md right-0 shadow-lg`}
    display: ${props => (props.visible ? 'flex' : 'none')};
    width: 170px;
    >div{
        ${tw`rounded-md bg-white shadow-xs`}
    }
`

interface DropdownItemProps{
    readonly text: string
    readonly color: string
}
export const DropdownItem = styled.a`
    ${tw`block px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
    color: ${props => (props.color ? props.color : props.theme.colors.heavyMetal)};
    font-family: 'Lato';
    font-size: 15px;
`

export const DropdownSeparator = styled.div`
    ${tw`border-t border-gray-100`}
`
