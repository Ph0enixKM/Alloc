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
