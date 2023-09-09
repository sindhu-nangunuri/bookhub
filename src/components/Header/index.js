import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiMenu} from 'react-icons/fi'
import {RiCloseCircleFill} from 'react-icons/ri'
import './index.css'

class Header extends Component {
  state = {displayNavbar: false}

  onClickCross = () => {
    this.setState({displayNavbar: false})
  }

  onClickMenu = () => {
    this.setState(prevState => ({
      displayNavbar: !prevState.displayNavbar,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  render() {
    const {home, shelves, favorite} = this.props
    const activeHome = home ? 'active-tab' : ''
    const activeShelves = shelves ? 'active-tab' : ''
    const activeFavorite = favorite ? 'active-tab' : ''

    const {displayNavbar} = this.state

    return (
      <div>
        <div className="header-container">
          <div className="header-website-logo1">
            <Link to="/">
              <>
                <img
                  src="https://res.cloudinary.com/deopx4rdp/image/upload/v1692264498/q16zphva6jljva3c0jyh.png"
                  alt="website logo"
                  className="header-website-logo"
                />
              </>
            </Link>
          </div>
          <ul className="tabs-container">
            <Link to="/" className="link">
              <li className={`list-item ${activeHome}`}>Home</li>
            </Link>
            <Link to="/shelf" className="link">
              <li className={`list-item ${activeShelves}`}>Bookshelves</li>
            </Link>

            <li className="list-item">
              <button
                className="logout-btn"
                type="button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="header-navbar-responsive-container">
          <div className="header-nav-container">
            <Link to="/">
              <img
                className="header-navbar-website-logo"
                src="https://res.cloudinary.com/deopx4rdp/image/upload/v1692264498/q16zphva6jljva3c0jyh.png"
                alt="website logo"
              />
            </Link>
            <button
              type="button"
              className="cross-icon-button"
              onClick={this.onClickMenu}
            >
              <FiMenu className="menu-icon" />
            </button>
          </div>
          {displayNavbar && (
            <>
              <div className="header-navbar-tabs-container">
                <Link to="/" className="link">
                  <p className={`list-item ${activeHome}`}>Home</p>
                </Link>
                <Link to="/shelf" className="link">
                  <p className={`list-item ${activeShelves}`}>BookShelves</p>
                </Link>
                <Link to="/favorites" className="link">
                  <p className={`list-item ${activeFavorite}`}>MyFavorites</p>
                </Link>
              </div>
              <div className="header-navbar-tabs-container">
                <button
                  onClick={this.onClickLogout}
                  type="button"
                  className="logout-btn"
                >
                  Logout
                </button>
                <button
                  type="button"
                  className="cross-icon-button"
                  onClick={this.onClickCross}
                >
                  <RiCloseCircleFill className="cross-icon" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
