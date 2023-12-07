import styled from 'styled-components'

export const LoginBgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${props => props.bgColor};
`

export const LoginFormCard = styled.form`
  display: flex;
  background-color: ${props => props.bgColor};
  flex-direction: column;
  width: 350px;
  aspect-ratio: 1;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 16px 9px rgba(0, 0, 0, 0.1),
    0px 10px 15px -3px rgba(0, 0, 0, 0.1);
`

export const Logo = styled.img`
  align-self: center;
  width: 160px;
  margin: 20px auto 40px;
`

export const InputField = styled.input`
  margin-bottom: 10px;
  border: 1px solid grey;
  border-radius: 3px;
  height: 30px;
  padding: 5px 10px;
`
export const LoginBtn = styled.button`
  border: none;
  height: 30px;
  background-color: blue;
  color: #ffffff;
  border-radius: 5px;
  margin-top: 20px;
`

export const InputFieldLabel = styled.label`
  font-size: 12px;
  color: gray;
  font-weight: 600;
  margin-bottom: 5px;
`
