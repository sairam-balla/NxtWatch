import {Component} from 'react'

import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import VideoCard from '../VideoCard'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import ThemeContext from '../../context/ThemeContext'

import {
  HomeBgContainer,
  HomeContainer,
  FlexRowContainer,
  VideosContainer,
  BannerContainer,
  VideosListContainer,
  BannerLogo,
  PremiumBtn,
  SearchBtn,
  SearchInput,
} from './StyledComponent'

class Home extends Component {
  state = {
    videos: [],
    searchInput: '',
    apiStatus: '',
    bannerShow: true,
    searchInputText: '',
  }

  componentDidMount() {
    this.onSelectHome()
  }

  onSelectHome = async () => {
    this.setState({apiStatus: 'loading'})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`

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
        {videos.length !== 0 ? (
          <VideosListContainer>
            {videos.map(eachItem => (
              <VideoCard key={eachItem.id} {...eachItem} />
            ))}
          </VideosListContainer>
        ) : (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <h1>No Search results found</h1>
            <p>Try different key words or remove search filter</p>
            <button type="button" onClick={this.onSelectHome}>
              Retry
            </button>
          </div>
        )}
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

  onCloseBanner = () => this.setState({bannerShow: false})

  onChangeSearch = event => this.setState({searchInputText: event.target.value})

  onClickSearch = () => {
    const {searchInputText} = this.state
    this.setState({searchInput: searchInputText}, this.onSelectHome)
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {selectedTheme} = value
          const {bannerShow} = this.state

          return (
            <HomeBgContainer
              theme={selectedTheme === 'light' ? '#f9f9f9' : '#181818'}
              data-testid="home"
            >
              <Header />
              <FlexRowContainer>
                <SideBar className="sidebar" />
                <HomeContainer>
                  {bannerShow && (
                    <BannerContainer data-testid="banner">
                      <FlexRowContainer>
                        <BannerLogo
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <button
                          type="button"
                          data-testid="close"
                          onClick={this.onCloseBanner}
                        >
                          X
                        </button>
                      </FlexRowContainer>
                      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                      <PremiumBtn>GET IT NOW</PremiumBtn>
                    </BannerContainer>
                  )}
                  <div>
                    <SearchInput
                      type="search"
                      placeholder="Search"
                      onChange={this.onChangeSearch}
                    />
                    <SearchBtn
                      data-testid="searchButton"
                      onClick={this.onClickSearch}
                    >
                      Search
                    </SearchBtn>
                  </div>
                  {this.renderReturnView()}
                </HomeContainer>
              </FlexRowContainer>
            </HomeBgContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
