import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload

      if (action.payload.rememberMe) {
        localStorage.setItem("token", action.payload.token)
        localStorage.setItem("user", JSON.stringify(action.payload))
      }
    },
    logout: state => {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      state.user = null
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      }
    },
  },
})

export const { login, logout, updateUser } = userSlice.actions

export const selectUser = state => state.user.user

export default userSlice.reducer
