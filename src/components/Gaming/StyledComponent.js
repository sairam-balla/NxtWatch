import styled from 'styled-components'

export const GamingContainer = styled.div`
  background-color: ${props => props.theme};
`

export const FlexRowContainer = styled.div`
  display: flex;
`

export const VideosContainer = styled.div`
  height: 90vh;
  overflow-y: auto;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`
