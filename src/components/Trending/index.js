import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import VideoCard from '../VideoCard'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import ThemeContext from '../../context/ThemeContext'

import {
  TrendingContainer,
  FlexRowContainer,
  VideosContainer,
} from './StyledComponent'

class Trending extends Component {
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
    const apiUrl = 'https://apis.ccbp.in/videos/trending'

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
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        viewCount: eachItem.view_count,
        publishedAt: eachItem.published_at,
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
        <h1>Trending</h1>
        <ul>
          {videos.map(eachItem => (
            <VideoCard key={eachItem.id} {...eachItem} />
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
            <TrendingContainer
              theme={selectedTheme === 'light' ? '#f9f9f9' : '#0f0f0f'}
              data-testid="trending"
            >
              <Header />
              <FlexRowContainer>
                <SideBar className="sidebar" />
                {this.renderReturnView()}
              </FlexRowContainer>
            </TrendingContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
