let bg = document.querySelector('#blurred-bg')
window.addEventListener('mousemove', e => {
  let loc = [
    e.x - window.innerWidth/2,
    e.y - window.innerHeight/2
  ]

  let base = [
    window.innerWidth/10,
    window.innerHeight/10
  ]

  let multiplier = 50

  let vector = [
    ( loc[0] / window.innerWidth/2 ) * multiplier,
    ( loc[1] / window.innerHeight/2 ) * multiplier
  ]

  bg.style.transform = `translate(${
    -base[0] + vector[0] + 'px'
  }, ${
    -base[1] + vector[1] + 'px'
  })`
})
// Login / Register button switch
let logReg = document.querySelector('#switch')
let login = document.querySelector('#login')
let register = document.querySelector('#register')
logReg.login = true
logReg.addEventListener('click', () => {
  logReg.login = !logReg.login
  if (logReg.login) {
    logReg.innerHTML = 'Create Account'
    login.style.display = 'inline-block'
    register.style.display = 'none'
  } else {
    logReg.innerHTML = 'Log in'
    login.style.display = 'none'
    register.style.display = 'inline-block'
  }
})
