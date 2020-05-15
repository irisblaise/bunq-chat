const user_id = 2
const baseURL = `http://assignment.bunq.com/`

const usersContainer = document.querySelector(`.talking-friends`)
const bunqBtn = document.querySelector(`.bunq-btn`)
const content = document.querySelector(`#new-message-input`)
const conversationID = document.querySelector(`#data-conversation-id`)
// const users = document.querySelectorAll(`.user-conversation`)
const users = usersContainer.getElementsByClassName("user-conversation")
const conversationList = document.querySelector(`#conversation-list`)

let state = {}

//



const allUsers = async () => {
    const response = await fetch(`${baseURL}users`)
    const data = await response.json()
      data.forEach(item => {
        if (item.id == user_id) {
        const user = `<a class="user-conversation" data-user-id="${item.id}">""</a>`
        } else {
          console.log(item.name)
          const user = `<a class="user-conversation" data-user-id="${item.id}">${item.name}</a>`
          usersContainer.insertAdjacentHTML("beforeend", user)
          }
  })
}

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
     // document.querySelector("#conversation-list").innerHTML = "";
      user.setAttribute("data-conversation-id", data.id)
      getMessages(data.id)
      }
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
                  Send on: ${new Date().toLocaleDateString()}
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
      // const time = `<div class="message-time"> Send on: ${new Date().toLocaleDateString()}</div>`
      usersContainer.insertAdjacentHTML("beforeend", user)
    })
}


// if it has a user id, dont refresh the page. else, clean page


// const getTwoUsers = () => {
//   fetch(`http://assignment.bunq.com/conversation/user/${user_id}`)
//     .then(response => response.json())
//     .then(data => {
//        const twoUsers = data.filter(item => {
//             const amountUsers = item.users
//             return amountUsers.length == 2
//         })
//           twoUsers.forEach(item => {
//           console.log(item.users)
//       })
//     })
// }




document.addEventListener("DOMContentLoaded", initChat)



// get all conversation for current user
// filter conversation just two users
// where atleast one of the two user id's has the id has the id that you are trying to talk to.
// assign that conversation id that


