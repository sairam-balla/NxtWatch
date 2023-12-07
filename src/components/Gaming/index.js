import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import VideoCard from '../VideoCard'

import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import ThemeContext from '../../context/ThemeContext'

import {
  GamingContainer,
  FlexRowContainer,
  VideosContainer,
} from './StyledComponent'

class Gaming extends Component {
  state = {
    videos: [],
    apiStatus: '',
  }

  componentDidMount() {
    this.onSelectHome()
  }

  onSelectHome = async () => {
    this.setState({apiStatus: 'loading'})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const videosData = data.videos
      const updatedData = videosData.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
      }))
      this.setState({videos: updatedData, apiStatus: 'success'})
    } else {
      console.log('failureApiRequest')
      this.setState({apiStatus: 'failure'})
    }
  }

  renderSuccessView = () => {
    const {videos} = this.state
    return (
      <VideosContainer>
        <h1>Gaming</h1>
        <ul>
          {videos.map(eachItem => (
            <VideoCard
              key={eachItem.id}
              {...eachItem}
              channel=""
              publishedAt=""
            />
          ))}
        </ul>
      </VideosContainer>
    )
  }

  renderReturnView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'success':
        return this.renderSuccessView()

      case 'loading':
        return <LoadingView />

      case 'failure':
        return <FailureView retryApi={this.onSelectHome} />

      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {selectedTheme} = value

          return (
            <GamingContainer
              theme={selectedTheme === 'light' ? '#f9f9f9' : '#0f0f0f'}
              data-testid="gaming"
            >
              <Header />
              <FlexRowContainer>
                <SideBar className="sidebar" />
                {this.renderReturnView()}
              </FlexRowContainer>
            </GamingContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
