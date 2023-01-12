import hslToHex from "./hslToHex";  

export default function changeHue() {
  const hue =  document.getElementById("hue")
  const layerOne =  document.querySelector(".layer-one")
  const hex = document.getElementById("hex")
  const hsl = JSON.parse(localStorage.getItem("color"))
  const color = `hsl(${hue.value}, ${hsl.s}%, ${hsl.l}%)`
  
  hsl.h = hue.value
  hex.value = hslToHex(hsl.h, hsl.s, hsl.l)
  hex.style.backgroundColor = color
  localStorage.setItem("color", JSON.stringify(hsl))  
  layerOne.style.backgroundImage = `linear-gradient(to right, white, hsl(${hue.value}, 100%, 50%))`;
}
