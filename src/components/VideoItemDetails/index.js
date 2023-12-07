import {Component} from 'react'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

import {LikeBtn, VideoItemDetailsBgContainer} from './StyledComponents'
import ThemeContext from '../../context/ThemeContext'

class VideoItemDetails extends Component {
  state = {videoDetails: {}, apiStatus: '', isLiked: ''}

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: 'loading'})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const videoData = data.video_details
      const videoDetails = {
        title: videoData.title,
        id: videoData.id,
        thumbnailUrl: videoData.thumbnail_url,
        channel: {
          name: videoData.channel.name,
          profileImageUrl: videoData.channel.profile_image_url,
          subscriberCount: videoData.channel.subscriber_count,
        },
        viewCount: videoData.view_count,
        videoUrl: videoData.video_url,
        publishedAt: videoData.published_at,
        description: videoData.description,
      }

      this.setState({videoDetails, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  onLike = () => {
    this.setState({isLiked: true})
  }

  onDislike = () => {
    this.setState({isLiked: false})
  }

  renderSuccessView = value => {
    const {videoDetails, isLiked} = this.state
    const {
      title,
      thumbnailUrl,
      viewCount,
      videoUrl,
      publishedAt,
      description,
      channel,
    } = videoDetails

    const {name, profileImageUrl, subscriberCount} = channel
    const {savedVideos, onSaveVideo, selectedTheme} = value
    console.log(savedVideos)
    const isVideoSaved = savedVideos.filter(
      eachItem => eachItem.id === videoDetails.id,
    )

    const updatedVideos = savedVideos.filter(
      eachItem => eachItem.id !== videoDetails.id,
    )
    console.log(isVideoSaved)

    const onClickSave = () =>
      isVideoSaved.length !== 0
        ? onSaveVideo(updatedVideos)
        : onSaveVideo([...savedVideos, videoDetails])

    return (
      <VideoItemDetailsBgContainer
        data-testid="videoItemDetails"
        bgColor={selectedTheme === 'light' ? '#ffffff' : '#0f0f0f'}
      >
        <ReactPlayer url={videoUrl} controls light={thumbnailUrl} />
        <img src={profileImageUrl} alt="channel logo" />
        <p>{title}</p>
        <p>{name}</p>
        <p>{subscriberCount}</p>
        <p>{viewCount}</p>
        <p>{publishedAt}</p>
        <p>{description}</p>
        <LikeBtn
          color={isLiked === true ? '#2563eb' : '#64748b'}
          onClick={this.onLike}
        >
          Like
        </LikeBtn>
        <LikeBtn
          color={isLiked === false ? '#2563eb' : '#64748b'}
          onClick={this.onDislike}
        >
          Dislike
        </LikeBtn>

        <button type="button" onClick={onClickSave}>
          {isVideoSaved.length !== 0 ? 'Saved' : 'Save'}
        </button>
      </VideoItemDetailsBgContainer>
    )
  }

  renderReturnView = value => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'success':
        return this.renderSuccessView(value)

      case 'loading':
        return <LoadingView />

      case 'failure':
        return <FailureView retryApi={this.getVideoDetails} />

      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => (
          <div>
            <Header />
            <div>
              <SideBar />
              {this.renderReturnView(value)}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
