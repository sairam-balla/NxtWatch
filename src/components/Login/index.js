import {Component} from 'react'
import Cookies from 'js-cookie'
import {
  LoginBgContainer,
  Logo,
  LoginFormCard,
  InputField,
  InputFieldLabel,
  LoginBtn,
} from './StyledComponent'
import ThemeContext from '../../context/ThemeContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,

    errorMsg: '',
  }

  componentDidMount() {
    const {history} = this.props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/')
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    console.log(jwtToken)
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const loginUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    const username = event.target.value
    this.setState({username})
  }

  onChangePassword = event => {
    const password = event.target.value
    this.setState({password})
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  render() {
    const {
      username,
      password,
      showPassword,

      showSubmitError,
      errorMsg,
    } = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {selectedTheme} = value

          return (
            <LoginBgContainer
              bgColor={selectedTheme === 'light' ? '#ffffff' : '#0f0f0f'}
            >
              <LoginFormCard
                bgColor={selectedTheme === 'light' ? '#f9f9f9' : '#1f1f1f'}
              >
                <Logo
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                />

                <InputFieldLabel htmlFor="username">USERNAME</InputFieldLabel>
                <InputField
                  autoComplete="true"
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={this.onChangeUsername}
                  value={username}
                />

                <InputFieldLabel htmlFor="password">PASSWORD</InputFieldLabel>
                <InputField
                  id="password"
                  type={showPassword === true ? 'text' : 'password'}
                  placeholder="Password"
                  onChange={this.onChangePassword}
                  value={password}
                />

                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="showPassword"
                    onClick={this.onShowPassword}
                  />
                  <InputFieldLabel htmlFor="showPassword">
                    Show Password
                  </InputFieldLabel>
                </div>

                <LoginBtn type="submit" onClick={this.onSubmitForm}>
                  Login
                </LoginBtn>
                {showSubmitError && <p>*{errorMsg}</p>}
              </LoginFormCard>
            </LoginBgContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
