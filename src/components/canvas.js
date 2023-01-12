import "./canvas.css"
import move from "./move"
import { useEffect } from "react"

function MainCanvas() {
  
  useEffect(() => {
    move()
  }, []);
  
  return (
    <div id="scale">
      <div id="grid"></div>
      <canvas id="canvas1"   width="1000.5px" height="1000.5px">Canvas does not supported in your browser</canvas>
    </div>
  )
}

export default MainCanvas