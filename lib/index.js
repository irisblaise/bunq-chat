import {allUsers} from './allUsers.js'
import {createConversation} from './createConversation.js'
// import {sayHi} from './say.js'

const user_id = 2
const baseURL = `http://assignment.bunq.com/`

//const usersContainer = document.querySelector(`.talking-friends`)
const bunqBtn = document.querySelector(`.bunq-btn`)
const content = document.querySelector(`#new-message-input`)
const conversationID = document.querySelector(`#data-conversation-id`)
// const users = document.querySelectorAll(`.user-conversation`)
//const users = usersContainer.getElementsByClassName("user-conversation")
const conversationList = document.querySelector(`#conversation-list`)


const initChat = async () => {
 document.querySelector("#conversation-list").innerHTML = "<h2>Choose you bunq friend to start your chat!</h2>";
 await allUsers()
  await createConversation()
}

document.addEventListener("DOMContentLoaded", initChat)


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
                  Send on: ${new Date().toLocaleDateString()}
                 </div>
              </div>
            </div>`
     conversationList.insertAdjacentHTML("beforeend", html)
     content.value = "";
  })

