interface SignInParams {
  email: string
  password: string
}

interface UserProfile {
  firstName: string
  lastName: string
}

type Token = string

const baseUrl = "http://localhost:3001/api/v1"

export async function signIn({
  email,
  password,
}: SignInParams): Promise<Token> {
  try {
    const response = await fetch(baseUrl + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    return data.body.token
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
  }
}

export async function getUserProfile(token: Token): Promise<UserProfile> {
  try {
    const response = await fetch(`${baseUrl}/user/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    return data.body
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
    throw error
  }
}

export async function updateUserProfile({
  token,
  firstName,
  lastName,
}): Promise<any> {
  try {
    const response = await fetch(`${baseUrl}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName }),
    })

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    if (!data || !data.body) {
      throw new Error("Invalid data structure")
    }
    return data.body
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
    throw error
  }
}
