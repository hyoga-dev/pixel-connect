export default function Move() {
  const canvas = document.getElementById("canvas1")
  const ctx = canvas.getContext("2d")
  const grid = document.getElementById("grid")
  const scale = document.getElementById("scale")

  let prevLeft, prevTop, canvaLeft, canvaTop,
      prevScroll = 1, clicked = false, moved = false;

  const w = parseInt(getComputedStyle(scale).getPropertyValue("width"))
  const h = parseInt(getComputedStyle(scale).getPropertyValue("height"))

  document.addEventListener('mousemove', move)
  document.addEventListener("mousedown", pinch)
  document.addEventListener("mouseup", pinchOut)
  document.addEventListener("wheel", scrol)
  canvas.addEventListener('mousemove', gridMove)

  function gridMove(e) {
    const x = Math.round(e.offsetX / prevScroll + .5) - 1
    const y = Math.round(e.offsetY / prevScroll + .5) - 1
    grid.style.display = "block"
    grid.style.left = x * prevScroll + "px"
    grid.style.top = y * prevScroll + "px"
  }

  function scrol(e) {
    // width after scale reduce by width before scale
    // divided by current width precentage of mouse coor
    const wBefore = parseInt(getComputedStyle(scale).getPropertyValue("width"))
    const hBefore = parseInt(getComputedStyle(scale).getPropertyValue("height"))
    const x = e.clientX
    const y = e.clientY

    canvaLeft = parseInt(getComputedStyle(scale).getPropertyValue('left'))
    canvaTop = parseInt(getComputedStyle(scale).getPropertyValue('top'))

    if (e.wheelDelta > 0) {
      prevScroll = prevScroll + 1
      zoom()
      gridDisplay(prevScroll)
    } else {
      prevScroll = prevScroll - 1
      if (prevScroll <= 1) prevScroll = 2
      zoom()
      gridDisplay(prevScroll)
    }

    function zoom() {
      scale.style.width = w * prevScroll + "px"
      scale.style.height = h * prevScroll + "px"
      
      const wAfter = parseInt(getComputedStyle(scale).getPropertyValue("width"))
      const wScaleVal = wAfter - wBefore
      const wMousePercent =  ((x - canvaLeft) / wAfter )
      scale.style.left = canvaLeft - (wScaleVal * wMousePercent) + "px" 
      // console.log(wMousePercent)
      
      const hAfter = parseInt(getComputedStyle(scale).getPropertyValue("height"))
      const hScaleVal = hAfter - hBefore
      const hMousePercent =  ((y - canvaTop) / hAfter )
      scale.style.top = canvaTop - (hScaleVal * hMousePercent) + "px"
    }

  }

  function gridDisplay(prevScroll) {
    grid.style.display = "none"
    grid.style.width = prevScroll + "px"
    grid.style.height = prevScroll + "px"
    // grid.style.opacity = prevScroll / 35
  }

  function pinch(e) {
    if (e.target.className === "layer-two" || e.target.className === "point" 
    || e.target.id === "hue" || e.target.id === "hex") return
    clicked = true
    prevLeft = e.clientX
    prevTop = e.clientY
    canvaLeft = parseInt(getComputedStyle(scale).getPropertyValue('left'))
    canvaTop = parseInt(getComputedStyle(scale).getPropertyValue('top'))
  }

  function move(e) {
    // console.log(e.target.id)
    if (e.target.className === "layer-two" || e.target.className === "point" 
    || e.target.id === "hue" || e.target.id === "hex") return
    if (clicked === false) return
    const x = e.clientX
    const y = e.clientY
    scale.style.left = canvaLeft - prevLeft + x + "px"
    scale.style.top = canvaTop - prevTop + y + "px"
    moved = true
  }

  function pinchOut(e) {
    clicked = false
    if (e.target.className === "layer-two" || e.target.className === "point" 
    || e.target.id === "hue" || e.target.id === "hex") return
    const offX = e.clientX - parseInt(canvas.getBoundingClientRect().left)
    const offY = e.clientY - parseInt(canvas.getBoundingClientRect().top) 
    const x = Math.round(offX / prevScroll + .5) - 1
    const y = Math.round(offY / prevScroll + .5) - 1
    if (!moved) {
      const hsl = JSON.parse(localStorage.getItem('color'))
      const color = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
      ctx.fillStyle = localStorage.getItem('color') == null ? "black" : color
      ctx.fillRect(x, y, 1, 1);
    };moved = false
  }

}