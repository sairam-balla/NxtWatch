import styled from 'styled-components'

export const HomeBgContainer = styled.div`
  background-color: ${props => props.theme};
`

export const FlexRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const HomeContainer = styled.div`
  height: 90vh;
  width: 100%;
`

export const VideosContainer = styled.div``
export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 20px;
  height: 20vh;
`
export const VideosListContainer = styled.ul`
  height: 60vh;
  max-width: 100%;
  display: flex;
  overflow-y: auto;
  flex-direction: row;
  flex-wrap: wrap;
`
export const BannerLogo = styled.img`
  width: 150px;
`

export const PremiumBtn = styled.button`
  box-shadow: 0px 0px 8px 0.5px #9fb4f2;
  background-color: #7892c2;
  font-size: 12px;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 19px;
  color: #ffffff;
  border: none;
`

export const SearchInput = styled.input`
  margin: 20px 0px 0px 60px;
  width: 40vw;
  height: 30px;
  border-radius: 8px 0px 0px 8px;
  border: 1.5px solid lightgrey;
  padding: 10px;
`
export const SearchBtn = styled.button`
  height: 30px;
  width: 80px;
  margin-top: 20px;
  border-radius: 0px 8px 8px 0px;
  border: 1.5px solid lightgrey;
`
