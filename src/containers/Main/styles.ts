import styled from 'styled-components'
import tw from 'twin.macro'

export const MainWrapper = styled.main`
  ${tw`flex-grow`}
  background-color:${props => props.theme.colors.sauvignon  };
`