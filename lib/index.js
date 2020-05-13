const user_id = 2
const baseURL = `http://assignment.bunq.com/`

const usersContainer = document.querySelector(`.talking-friends`)
const users = usersContainer.getElementsByClassName("user-conversation")
const bunqBtn = document.querySelector(`.bunq-btn`)
const content = document.querySelector(`#new-message-input`)
const conversationID = document.querySelector(`#data-conversation-id`)
const user = document.querySelector(`.user-conversation`)

const allUsers = async () => {
  const response = await fetch(`${baseURL}users`)
    const data = await response.json()
      data.forEach(item => {
          console.log(item.name)
          const user = `<a class="user-conversation" data-user-id="${item.id}">${item.name}</a>`
        usersContainer.insertAdjacentHTML("beforeend", user)
      })
}

const createConversation = () => {
  Array.from(users).forEach((user) => {
    user.addEventListener('click', async (event) => {
      event.preventDefault();
      if (user.dataset.conversationId) {
      } else {
        const userNewConversation = {users: user.dataset.userId }
        const response = await fetch(`${baseURL}conversation/personal`, {
          method: "POST",
          body: JSON.stringify(userNewConversation)
        })
        const data = await response.json()
        user.setAttribute("data-conversation-id", data.id)
       }
    })
  })
}

const initChat = async () => {
 await allUsers()
  createConversation()
}

bunqBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const myMessage = { message: content.value, senderId: user_id };
  fetch(`${baseURL}conversation/${conversationID}/message/send`, {
    method: "POST",
    body: JSON.stringify(myMessage)
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data)
  })
})

// user.addEventListener('click', async (event) => {
//     const response = await fetch (`${baseURL}/conversation/${conversationID}/message/limited`)
//       const data = await response.json()
//       data.forEach(item => {
//         console.log(item)
//       })
//   })




document.addEventListener("DOMContentLoaded", initChat)
