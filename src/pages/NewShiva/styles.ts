import styled from 'styled-components'

export const SubmitButton = styled.button`
  margin-top: 50px;
  background-color: ${props=> props.theme.colors.richGold};
  border-radius: 15px;
  padding: 15px;
  color: ${props=> props.theme.colors.white};
  font-size: 18px;
  width: 100%;
`