import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: sessionStorage.getItem("userSession")
      ? sessionStorage.getItem("userSession")
      : localStorage.getItem("user")
        ? localStorage.getItem("user")
        : null,
  },
  reducers: {
    login: (state, action) => {
      if (action.payload.rememberMe) {
        localStorage.setItem("user", JSON.stringify(action.payload))
      } else {
        sessionStorage.setItem("userSession", JSON.stringify(action.payload))
      }
      localStorage.setItem("token", action.payload.token)
      state.user = JSON.stringify(action.payload)
    },
    logout: state => {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      sessionStorage.removeItem("userSession")
      state.user = null
    },
    updateUser: (state, action) => {
      const user = JSON.parse(state.user?.toString() || "")
      user.firstName = action.payload.firstName
      user.lastName = action.payload.lastName
      if (localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(user))
      }
      if (sessionStorage.getItem("userSession")) {
        sessionStorage.setItem("userSession", JSON.stringify(user))
      }
      state.user = JSON.stringify(user)
    },
  },
})

export const { login, logout, updateUser } = userSlice.actions

export const selectUser = (state: any) => state.user.user

export default userSlice.reducer
