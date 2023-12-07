import styled from 'styled-components'

export const SidebarContainer = styled.div`
  width: 200px;
  background-color: ${props => props.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90vh;
  padding: 20px;
  position: sticky;
`

export const SidebarUnorderedList = styled.ul`
  padding-left: 0px;
`
export const SidebarListItem = styled.li`
  list-style-type: none;
  padding: 5px 0px 8px;
  margin: 2px auto;
  border-bottom: 1.5px solid lightgrey;
`
