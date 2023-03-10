export default function hexToHSL(hex) {
  try {

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      let r = parseInt(result[1], 16);
      let g = parseInt(result[2], 16);
      let b = parseInt(result[3], 16);
      r /= 255; g /= 255; b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if(max === min){
        h = s = 0; // achromatic
      } else{
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          // eslint-disable-next-line default-case
          switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
      }
    return {h:h * 360, s:s * 100, l:l * 100};

  } catch (error) {return}
}