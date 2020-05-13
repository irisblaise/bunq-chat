const user_id = 2
const baseURL = `http://assignment.bunq.com/`

const usersContainer = document.querySelector(`.talking-friends`)
const users = usersContainer.getElementsByClassName("user-conversation")
const bunqBtn = document.querySelector(`.bunq-btn`)
const content = document.querySelector(`#new-message-input`)
const conversationID = document.querySelector(`#data-conversation-id`)
//const users = document.querySelectorAll(`.user-conversation`)
const conversationList = document.querySelector(`#conversation-list`)

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
        getMessages(user.dataset.conversationId)
      }

      const userNewConversation = {users: user.dataset.userId }
      const response = await fetch(`${baseURL}conversation/personal`, {
        method: "POST",
        body: JSON.stringify(userNewConversation)
      })
      const data = await response.json()
      user.setAttribute("data-conversation-id", data.id)
      getMessages(data.id)
    })
  })
}

const initChat = async () => {
 await allUsers()
  await createConversation()
}

bunqBtn.addEventListener('click', async (event) => {
  event.preventDefault();
    const myMessage = { message: content.value, senderId: user_id };
    const response = await fetch(`${baseURL}conversation/${conversationID}/message/send`, {
      method: "POST",
      body: JSON.stringify(myMessage)
    })
    const data = await response.json()
     const html = `<div class="message-row my-message">
            <div class="message-content">
              <div class="message-author">
                you
              </div>
               <div class="message-text">
                 ${myMessage.message}
               </div>
               <div class="message-time">
                 10 o'clock
               </div>
            </div>
          </div>`
   conversationList.insertAdjacentHTML("beforeend", html)
})


const getMessages = async (conversationId) => {
  const response = await fetch(`${baseURL}conversation/${conversationId}/message/limited?
limit=5&offset=0`)
    const data = await response.json()
    document.querySelector("#conversation-list").innerHTML = "";
    data.forEach(item => {
      console.log(item)
      const message =  `<div class="message-text">${item}</div>`
      usersContainer.insertAdjacentHTML("beforeend", user)
    })
}

document.addEventListener("DOMContentLoaded", initChat)
