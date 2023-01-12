import hexToHSL from "./color-compt/hexToHsl"
import hslToHex from "./color-compt/hslToHex"

function paletteItem() {
  const addBtn = document.querySelector(".btn-add")
  const baseCol = ["#79b35d", "#33c7c4", "#c77633", "#c73395", "#944d4d",
  "#98cd51", "#965fae", "#ffffff", "#000000", "#ffaa88"]
  addBaseItem(baseCol)
  palItemAdd()
  addBtn.addEventListener("click", addItem)
}

function addBaseItem(baseCol) {
  const con = document.querySelector(".palette")
  for (let i = 0; i < baseCol.length; i++) {
    const div = document.createElement("DIV")
    div.classList.add("palette-item")
    div.setAttribute("data-color", baseCol[i])
    div.style.backgroundColor = div.getAttribute("data-color")
    con.appendChild(div)
  }
}

function addItem() {
  const con = document.querySelector(".palette")
  const div = document.createElement("DIV")

  const hsl = localStorage.getItem("color")
  const color = JSON.parse(hsl)
  const hex = hslToHex(color.h, color.s, color.l)
  // console.log(hex)

  div.classList.add("palette-item")
  div.setAttribute("data-color", hex)
  div.style.backgroundColor = div.getAttribute("data-color")
  con.appendChild(div)

  palItemAdd()
}

// function savePaletteItem() {
//   const con = document.querySelector(".palette-container")
  
// }

function palItemAdd() {
  const palItem = document.querySelectorAll(".palette-item")
  palItem.forEach(item => {
    item.addEventListener("click", () => palItemClicked(item))
  })
}

function palItemClicked(item) {
  const hex = hexToHSL(item.getAttribute("data-color"))
  const hsl = {h:hex.h, s:hex.s, l:hex.l}
  localStorage.setItem('color', JSON.stringify(hsl))
}

export default paletteItem