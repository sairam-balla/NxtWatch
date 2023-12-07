import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  height: 10vh;
  align-items: center;
  justify-content: space-between;
  padding: 20px 50px;
  background-color: ${props => props.theme};
`
export const HeaderItemsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Logo = styled.img`
  width: 160px;
`

export const ProfileImg = styled.img`
  width: 40px;
  margin: auto 20px;
`
export const ThemeChangeBtn = styled.button`
  border: none;
  background-color: transparent;
`
