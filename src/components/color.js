import { useEffect } from "react"
import changeHue from "./color-compt/changeHue";
import colorWheel from "./color-compt/colorWheel";
import hexToHSL from "./color-compt/hexToHsl";
import "./color.css"
import Palette from "./palette";

function Color() {

  useEffect(() => {
    colorWheel()
    // reset color
    const hue =  document.getElementById("hue")
    const hsl = {h:40, s:0, l:100}
    hue.value = 100
    localStorage.setItem("color", JSON.stringify(hsl))
  }, []);

  function changeColor() {
    const layerOne =  document.querySelector(".layer-one")
    const point = document.querySelector(".point")
    const hex =  document.getElementById("hex")
    const hue =  document.getElementById("hue")
    const hsl = hexToHSL(hex.value)
    if (hsl === undefined) return

    hex.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    hue.value = Math.floor(hsl.h)
    layerOne.style.backgroundImage = `linear-gradient(to right, white, hsl(${hsl.h}, 100%, 50%))`;

    // const left =  ((100 - hsl.s) / 100) * hsl.l
    // const top = hsl.l - left
    // console.log(top - 90)
    
    point.style.left = `${hsl.s * 2 - 7}px`
    // point.style.top = `${top}px`

    localStorage.setItem("color", JSON.stringify(hsl))
    
    console.log(hsl)
  }

  return (
    <div className="right-nav">
      <div id="color-wheel" draggable="false">
        <div className="point"></div>
        <div className="layer-one"></div>
        <div className="layer-two"></div>
      </div>
      <input type={"range"} id="hue" min="0" max="360" onInput={changeHue} />
      <input type="text" id="hex" onChange={changeColor} draggable="false" />
      <Palette />      
    </div>
  )
}

export default Color