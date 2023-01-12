import hslToHex from "./hslToHex"

export default function colorWheel() {
  const coWheel = document.getElementById("color-wheel")
  const point = document.querySelector(".point")
  const hue = document.getElementById("hue")
  const hex = document.getElementById("hex")
  const coWheelWidth = parseInt(getComputedStyle(coWheel).getPropertyValue("width"))
  const coWheelHeight = parseInt(getComputedStyle(coWheel).getPropertyValue("height"))
  let clicked;

  function movePoint(e) {
    const x = e.clientX
    const y = e.clientY
    const leftBound = parseInt(coWheel.getBoundingClientRect().left)
    const topBound = parseInt(coWheel.getBoundingClientRect().top)
    const saturation = ((x - leftBound) / 2)
    const hsb = ( coWheelWidth - (x - leftBound) ) * .5 / 100 + 1
    let luminance = (( coWheelHeight - (y - topBound) ) / 2) * .5
    luminance = luminance * hsb

    if (luminance < 60) {
      hex.style.color = "white"
    } else {
      hex.style.color = "black"
    }

    const hsl = {h:hue.value, s:saturation, l:luminance}
    localStorage.setItem('color', JSON.stringify(hsl))
    
    // const l = 200 - ((hsl.l <= 0 ? 0 : hsl.l >= 50 ? 50 : hsl.l) * 4)
    // const top = hsl.l 
    // const top = l //- (l * (hsl.s / 100))
    // const left =  ((100 - hsl.s) / 100) * hsl.l
    // console.log(hsl.l - left)
    // console.log(hsl.s / 100)
    // console.log("hsl", (hsl.l - 4))

    hex.value = hslToHex(hsl.h, hsl.s, hsl.l)
    hex.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`

    if (x - leftBound < 0 || y - topBound < 0 ||
     x - leftBound > coWheelWidth || y - topBound > coWheelHeight) return colorUnclick();  
    point.style.left = x - leftBound - 7 + "px"
    point.style.top = y - topBound - 7 + "px"
  }

  coWheel.addEventListener('mousedown', colorClick)
  coWheel.addEventListener('mousemove', colorMove)
  document.addEventListener('mouseup', colorUnclick)

  function colorClick(e) {movePoint(e); clicked = true}
  function colorMove(e) { if (!clicked) return; movePoint(e) }
  function colorUnclick() {clicked = false}

}