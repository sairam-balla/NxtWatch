import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import LogoutPopUp from '../LogoutPopUp'
import ThemeContext from '../../context/ThemeContext'

import {
  HeaderContainer,
  Logo,
  ProfileImg,
  ThemeChangeBtn,
  HeaderItemsContainer,
} from './StyledComponent'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {selectedTheme, changeTheme} = value
      const onChangeTheme = () => {
        if (selectedTheme === 'light') {
          changeTheme('dark')
        } else {
          changeTheme('light')
        }
      }

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <HeaderContainer
          theme={selectedTheme === 'light' ? '#ffffff' : '#000000'}
        >
          <div>
            <Link to="/">
              <Logo
                src={
                  selectedTheme === 'light'
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                }
                alt="website logo"
              />
            </Link>
          </div>
          <HeaderItemsContainer>
            <ThemeChangeBtn data-testid="theme" onClick={onChangeTheme}>
              {selectedTheme === 'light' ? (
                <FaMoon />
              ) : (
                <FiSun color="#ffffff" />
              )}
            </ThemeChangeBtn>

            <ProfileImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <LogoutPopUp onClickLogout={onClickLogout} />
          </HeaderItemsContainer>
        </HeaderContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
