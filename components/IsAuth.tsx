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

  if (requireAuth) {
    return user ? <Child /> : <Navigate to="/login" />
  } else {
    return user ? <Navigate to="/account" /> : <Child />
  }
}
