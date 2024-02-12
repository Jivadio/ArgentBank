import styles from "./Login.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../../features/userSlice"
import { useMutation } from "react-query"
import { signIn, getUserProfile } from "../../services/api"
import { UserCircleIcon } from "@heroicons/react/16/solid"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signInMutation = useMutation(signIn, {
    onSuccess: async token => {
      const userProfile = await getUserProfile(token)
      if (userProfile) {
        dispatch(
          login({
            token,
            rememberMe,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
          }),
        )
        navigate("/account")
      } else {
        alert("Invalid credentials")
      }
    },
    onError: error => {
      console.error(error)
      alert("An error occurred")
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    signInMutation.mutate({ email, password })
  }

  return (
    <main className={`${styles.main} ${styles.bg_dark}`}>
      <section className={styles.sign_in_content}>
        <UserCircleIcon className={styles.sign_in_icon} />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_wrapper}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.input_remember}>
            <input
              type="checkbox"
              id="remember-me"
              defaultChecked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className={styles.sign_in_button}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}
