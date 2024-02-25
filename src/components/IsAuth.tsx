import { useSelector } from "react-redux"
import { selectUser } from "../features/userSlice"
import { Navigate } from "react-router-dom"

export const IsAuth = ({
  Child,
  requireAuth,
}: {
  Child: React.FC
  requireAuth: boolean
}): JSX.Element => {
  const user = useSelector(selectUser)
  const token = localStorage.getItem("token")

  if (requireAuth && !(user || token)) {
    return <Navigate to="/login" />
  }

  if (!requireAuth && (user || token)) {
    return <Navigate to="/account" />
  }

  return <Child />
}
