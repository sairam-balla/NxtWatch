import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

const NotFound = () => (
  <div className="home-bg-container">
    <Header />
    <div className="flex-row-container">
      <SideBar className="sidebar" />
      <div className="flex-col-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
          alt="not found"
          className="not-found-img"
        />
        <h1>Page Not Found</h1>
        <p>we are sorry, the page you requested could not be found.</p>
      </div>
    </div>
  </div>
)

export default NotFound
