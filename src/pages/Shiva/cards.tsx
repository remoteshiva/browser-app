import React, { ReactNode } from 'react'
import { CardWrapper } from './styles'
import { Shiva } from '../../store/shiva/types'

interface Props {
    children: ReactNode
    shiva?: Shiva | null
}
export const BlankCard = ({children, shiva}: Props) => (
    <CardWrapper>
        {children}
    </CardWrapper>
)

export const TitleCard = ({shiva}: Props) => (
    <CardWrapper>

    </CardWrapper>
)

