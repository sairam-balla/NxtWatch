import './App.css'
import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'

// Replace your code here
class App extends Component {
  state = {selectedTheme: 'light', savedVideos: []}

  onChangeTheme = theme => {
    this.setState({selectedTheme: theme})
  }

  onSaveVideo = updatedVideos => {
    this.setState({savedVideos: updatedVideos})
  }

  render() {
    const {selectedTheme, savedVideos} = this.state

    return (
      <ThemeContext.Provider
        value={{
          selectedTheme,
          changeTheme: this.onChangeTheme,
          savedVideos,
          onSaveVideo: this.onSaveVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/notfound" component={NotFound} />
          <Redirect to="/notfound" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
