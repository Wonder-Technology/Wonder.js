


function convertContextConfigDataToJsObj(param) {
  return {
          alpha: param[/* alpha */0],
          depth: param[/* depth */1],
          stencil: param[/* stencil */2],
          antialias: param[/* antialias */3],
          premultipliedAlpha: param[/* premultipliedAlpha */4],
          preserveDrawingBuffer: param[/* preserveDrawingBuffer */5]
        };
}

export {
  convertContextConfigDataToJsObj ,
  
}
/* No side effect */
