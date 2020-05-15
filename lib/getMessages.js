const baseURL = `http://assignment.bunq.com/`


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

export {getMessages}
