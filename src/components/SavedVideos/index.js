import Header from '../Header'
import SideBar from '../SideBar'
import VideoCard from '../VideoCard'

import ThemeContext from '../../context/ThemeContext'
import {SavedVideosBgContainer, SavedVideosHeading} from './StyledComponents'

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {selectedTheme, savedVideos} = value

      const savedVideosList = () => (
        <ul>
          {savedVideos.map(eachItem => (
            <VideoCard key={eachItem.id} {...eachItem} />
          ))}
        </ul>
      )

      const noSavedVideos = () => (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <SavedVideosHeading>No saved videos found</SavedVideosHeading>
          <p>You can save your videos while watching them</p>
        </div>
      )

      return (
        <SavedVideosBgContainer
          data-testid="savedVideos"
          bgColor={selectedTheme === 'light' ? '#ffffff' : '#0f0f0f'}
        >
          <Header />
          <div className="flex-row-container">
            <SideBar className="sidebar" />
            <SavedVideosHeading>Saved Videos</SavedVideosHeading>
            {savedVideos.length !== 0 ? savedVideosList() : noSavedVideos()}
          </div>
        </SavedVideosBgContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideos
