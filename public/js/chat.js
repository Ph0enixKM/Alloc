(function(){

  // Variables
  let output = document.querySelector('.chat-output')
  let input = document.querySelector('.chat-input')
  let socket = io.connect()

  // Input Output (io) conection system
  socket.on('output', data => {
    if (data.length) {
      for (let mess of data) {
        let message = document.createElement('div')
          message.className = (mess.name == user.fname) ? 'dymke-me' : 'dymke-other'
          message.innerText = `${mess.name}: ${mess.message}`
          output.appendChild(message)
          message.outerHTML = '<div class="dymke">' + message.outerHTML + '</div>'
          output.scrollTop = output.scrollHeight
      }
    }
  })

  input.addEventListener('keydown', e => {
    if (e.keyCode == 13 && !e.shiftKey) {
      socket.emit('input', { name : user.fname, message : input.value})
      e.preventDefault()
      input.value = ''
    }
  })

  chat()

  function chat () {
    input.addEventListener('focus', () => {
      input.style.border = '2px solid #FF5729'
      input.setAttribute('focus', 1)
    })
    input.addEventListener('focusout', () => {
      input.style.border = '2px dashed #444'
      input.setAttribute('focus', 0)
    })
    input.addEventListener('mouseover', () => {
      if (!+input.getAttribute('focus')) {
        input.style.border = '2px dashed #555'
      }
    })
    input.addEventListener('mouseout', () => {
      if (!+input.getAttribute('focus')) {
        input.style.border = '2px dashed #444'
      }
    })
  }

})()
