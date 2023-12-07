import {withRouter, Link} from 'react-router-dom'

import {
  VideoCardContainer,
  ChannelLogo,
  VideoThumbnail,
} from './StyledComponent'

const VideoCard = props => {
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = props

  let name = ''
  let profileImageUrl = ''
  if (channel !== '') {
    name = channel.name
    profileImageUrl = channel.profileImageUrl
  }

  return (
    <VideoCardContainer>
      <Link to={`/videos/${id}`}>
        <VideoThumbnail src={thumbnailUrl} alt="video thumbnail" />
        <div className="video-description">
          <div className="video-details">
            <p>{title}</p>
            <p>{name}</p>
            {profileImageUrl && (
              <ChannelLogo src={profileImageUrl} alt="channel logo" />
            )}
            <p>{viewCount} views</p> {publishedAt && <p> • {publishedAt}</p>}
          </div>
        </div>
      </Link>
    </VideoCardContainer>
  )
}

export default withRouter(VideoCard)
