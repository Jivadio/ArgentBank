import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../features/userSlice"

export const IsAuth = ({
  Child,
  requireAuth,
}: {
  Child: React.FC
  requireAuth: boolean
}): JSX.Element => {
  const user = useSelector(selectUser)
  console.log("user", user)
  if (!requireAuth && user) {
    return <Navigate to="/account" />
  }
  if (requireAuth && !user) {
    return <Navigate to="/login" />
  }
  return <Child />
}
