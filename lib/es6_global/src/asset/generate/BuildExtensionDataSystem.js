


function buildExtensionsUsed(lightDataArr) {
  var match = lightDataArr.length > 0;
  if (match) {
    return /* array */["KHR_lights"];
  } else {
    return /* array */[];
  }
}

export {
  buildExtensionsUsed ,
  
}
/* No side effect */
