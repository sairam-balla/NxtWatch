import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

const LogoutPopUp = props => {
  const {onClickLogout} = props

  const onLogout = () => {
    onClickLogout()
  }

  return (
    <div className="popup-container">
      <Popup modal trigger={<button type="button">Logout</button>}>
        {close => (
          <>
            <div>
              <p>Are you sure, you want to logout</p>
            </div>
            <button
              type="button"
              className="trigger-button"
              onClick={() => close()}
            >
              Cancel
            </button>
            <button type="button" onClick={onLogout}>
              Confirm
            </button>
          </>
        )}
      </Popup>
    </div>
  )
}

export default LogoutPopUp
