


function getGlWrap(gl, wrap) {
  switch (wrap) {
    case 0 : 
        return gl.CLAMP_TO_EDGE;
    case 1 : 
        return gl.MIRRORED_REPEAT;
    case 2 : 
        return gl.REPEAT;
    
  }
}

export {
  getGlWrap ,
  
}
/* No side effect */
