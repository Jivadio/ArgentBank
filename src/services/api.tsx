const baseUrl = "http://localhost:3001/api/v1"

export async function signIn({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<any> {
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

export async function getUserProfile(token = null): Promise<any> {
  try {
    const tokenValue = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : token
    const response = await fetch(baseUrl + "/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify({
        firstName: "",
        lastName: "",
      }),
    })

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    return data.body
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
  }
}

export async function updateUserProfile({
  firstName,
  lastName,
}: {
  firstName: string
  lastName: string
}): Promise<any> {
  console.log("firstName", firstName)
  console.log("lastName", lastName)
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(baseUrl + "/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    })

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    return data.body
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
  }
}
