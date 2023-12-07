import React from 'react'

const ThemeContext = React.createContext({
  selectedTheme: 'light',
  changeTheme: () => {},
  savedVideos: [],
  onSaveVideo: () => {},
})

export default ThemeContext
