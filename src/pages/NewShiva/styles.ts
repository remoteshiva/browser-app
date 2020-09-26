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

export const StyledForm = styled.form`
  margin-top: 30px;
  label{
    color: ${props=> props.theme.colors.doveGray};
    font-size: 16px;
  }
  input{
    border-radius: 2px;
    border: solid 1px ${props=> props.theme.colors.sauvignonLight};
  }
  textarea{
    height: 132px;
    resize: none;
    border: solid 1px ${props=> props.theme.colors.sauvignonLight};
    &::placeholder{
      color: ${props=> props.theme.colors.dawn};
    }
  }
`

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: flex-end;
  img{
    margin-right: 113px;
  }
`