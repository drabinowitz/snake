function rgb2hex(rgb){
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[0],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) : '';
}