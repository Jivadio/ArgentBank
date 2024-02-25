import styles from "./Account.module.css"
import { accountContent } from "../../data/accountData"
import { CardAccount } from "../../components/CardAccount/CardAccount"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, updateUser } from "../../features/userSlice"
import { updateUserProfile } from "../../services/api"
import { useMutation } from "react-query"

export function Account() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [showModal, setShowModal] = useState(false)

  const updateProfileMutation = useMutation(updateUserProfile, {
    onSuccess: data => {
      dispatch(updateUser({ firstName, lastName }))
      setShowModal(false)
    },
    onError: error => {
      alert("Something went wrong" + error)
    },
  })

  const handleSubmit = async e => {
    e.preventDefault()
    console.log("Updating profile with:", {
      token: user.token,
      firstName,
      lastName,
    })
    updateProfileMutation.mutate({ token: user.token, firstName, lastName })
  }

  return (
    <main className={`${styles.main} ${styles.bg_dark}`}>
      {!showModal ? (
        <div className={styles.header}>
          <h1>
            Welcome back
            <br />
            {user?.firstName} {user?.lastName}
          </h1>

          <button
            className={styles.edit_button}
            onClick={() => setShowModal(!showModal)}
          >
            Edit Name
          </button>
        </div>
      ) : (
        <div className={styles.header}>
          <h1>Welcome back</h1>
          <form className={styles.edit_modal} onSubmit={handleSubmit}>
            <div className={styles.edit_modal_content}>
              <input
                type="text"
                placeholder={user?.firstName}
                className={styles.edit_modal_content_input}
                onChange={e => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder={user?.lastName}
                className={styles.edit_modal_content_input}
                onChange={e => setLastName(e.target.value)}
              />
            </div>

            <div className={styles.edit_modal_buttons}>
              <button type="submit" className={styles.edit_modal_buttons_btn}>
                Save
              </button>
              <button
                type="button"
                className={styles.edit_modal_buttons_btn}
                onClick={() => setShowModal(!showModal)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <h2 className={styles.sr_only}>Accounts</h2>

      {accountContent.map((account, index) => (
        <CardAccount key={index} {...account} />
      ))}
    </main>
  )
}
