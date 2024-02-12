import styles from "./Header.module.css"
import logo from "../../assets/images/logo.png"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout, selectUser } from "../../features/userSlice"
import {
  UserCircleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/16/solid"

export function Header() {
  const user = JSON.parse(useSelector(selectUser))
  const dispatch = useDispatch()

  const userLogout = () => {
    dispatch(logout())
  }

  return (
    <header className={styles.header}>
      <nav className={styles.main_nav}>
        <NavLink className={styles.main_nav_logo} to="/">
          <img
            className={styles.main_nav_logo_image}
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className={styles.sr_only}>Argent Bank</h1>
        </NavLink>
        <div>
          {user ? (
            <div className={styles.main_nav_wrapper}>
              <NavLink to="/account" className={styles.main_nav_item}>
                <UserCircleIcon />
                {user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1)}
              </NavLink>
              <NavLink
                to="/"
                className={styles.main_nav_item}
                onClick={userLogout}
              >
                <ArrowRightEndOnRectangleIcon />
                Sign Out
              </NavLink>
            </div>
          ) : (
            <NavLink className={styles.main_nav_item} to="/login">
              <UserCircleIcon />
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}
