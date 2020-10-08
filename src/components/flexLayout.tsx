import styled from 'styled-components'

interface RowProps {
  height?: number
}
export const Row = styled.div<RowProps>`
  display: flex;
  width: 100%;
  height: ${props => `${props.height}px`};
  flex-direction: row;
`

interface ColumnContainerProps {
  width: string
}
export const ColumnContainer = styled.div<ColumnContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
`

interface FixedProps {
  width: number
}
export const FixedColumn = styled.div<FixedProps>`
  width: ${props => `${props.width}px`};
`
export const FlexColumn = styled.div`
  flex: 1;
`
