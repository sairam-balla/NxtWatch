import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {IoGameController} from 'react-icons/io5'
import {MdPlaylistAdd} from 'react-icons/md'
import ThemeContext from '../../context/ThemeContext'
import {
  SidebarContainer,
  SidebarUnorderedList,
  SidebarListItem,
} from './StyledComponents'
import './index.css'

const SideBar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {selectedTheme} = value

      return (
        <SidebarContainer
          bgColor={selectedTheme === 'light' ? '#ffffff' : '#000000'}
        >
          <SidebarUnorderedList>
            <Link to="/">
              <SidebarListItem>
                <AiFillHome className="sidebar-menu-icon" />
                Home
              </SidebarListItem>
            </Link>
            <Link to="/trending">
              <SidebarListItem>
                <HiFire className="sidebar-menu-icon" />
                Trending
              </SidebarListItem>
            </Link>
            <Link to="/gaming">
              <SidebarListItem>
                <IoGameController className="sidebar-menu-icon" />
                Gaming
              </SidebarListItem>
            </Link>
            <Link to="/saved-videos">
              <SidebarListItem>
                <MdPlaylistAdd className="sidebar-menu-icon" />
                Saved Videos
              </SidebarListItem>
            </Link>
          </SidebarUnorderedList>

          <div>
            <p className="contact-us-heading">CONTACT US</p>
            <div className="contact-us-icons-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </div>
            <p className="contact-us-caption">
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </SidebarContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default SideBar
