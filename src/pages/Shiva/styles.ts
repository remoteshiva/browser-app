import styled from 'styled-components'

export const EditShivaWrapper = styled.div`
  display: flex;
  padding: 10px 10px;
`

export const Content = styled.div`
  flex: 1 0 auto;
  padding: 10px;
`

export const SideBar = styled.div`
  width: 300px;
  padding: 10px;
`

export const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.04);
  h2 {
    font-family: 'Lora';
    font-size: 28px;
    color: ${props=> props.theme.colors.heavyMetal};
  }
`

export const DeceasedImage = styled.div`
  width: 200px;
`

export const Button = styled.button`
  background-color: ${props=> props.theme.colors.richGold};
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
  color: ${props=> props.theme.colors.white};
  font-size: 18px;
  width: 100%;
`