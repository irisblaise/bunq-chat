import {getMessages} from './getMessages.js'

const baseURL = `http://assignment.bunq.com/`
const usersContainer = document.querySelector(`.talking-friends`)
const users = usersContainer.getElementsByClassName("user-conversation")

const createConversation = () => {
  Array.from(users).forEach((user) => {
    user.addEventListener('click', async (event) => {
      event.preventDefault();
      if (user.dataset.conversationId) {
        getMessages(user.dataset.conversationId)
      } else {
      const userNewConversation = {users: user.dataset.userId }
      const response = await fetch(`${baseURL}conversation/personal`, {
        method: "POST",
        body: JSON.stringify(userNewConversation)
      })
      const data = await response.json()
      user.setAttribute("data-conversation-id", data.id)
      getMessages(data.id)
      }
    })
  })
}

export {createConversation}
