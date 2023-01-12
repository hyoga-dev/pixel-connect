import "./palette.css"
import "./palette-scrollbar.css"
import { useEffect } from "react";
import  {ReactComponent as NewIcon } from "../assets/new.svg"
import { ReactComponent as TrashIcon } from "../assets/trash.svg";
import paletteItem from "./palette-item";

function Palette() {

  useEffect(() => {
    paletteItem()
  }, []);

  return (
    <div className="palette-container">

      <div className="palette"></div>

      <div className="palette-ctrl">
        <div className="btn-trash"> <TrashIcon width="1.5vw" height="1.5vw"/> </div>
        <div className="btn-add" ><NewIcon width="1.5vw" height="1.5vw" title="new color"/> </div>
      </div>

    </div>
  )
}

export default Palette