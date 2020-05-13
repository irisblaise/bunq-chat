const user_id = 2
const baseURL = `http://assignment.bunq.com/`

const usersContainer = document.querySelector(`.talking-friends`)

const allUsers = async () => {
  const response = await fetch(`${baseURL}/users`)
    const data = await response.json()
      data.forEach(item => {
          console.log(item.name)
          const user = `<a class="user-conversation" data-user-id="${item.id}">${item.name}</a>`
        usersContainer.insertAdjacentHTML("beforeend", user)
      })
}

document.addEventListener("DOMContentLoaded", allUsers)
