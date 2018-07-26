


function getGlFilter(gl, filter) {
  switch (filter) {
    case 0 : 
        return gl.NEAREST;
    case 1 : 
        return gl.LINEAR;
    case 2 : 
        return gl.NEAREST_MIPMAP_NEAREST;
    case 3 : 
        return gl.LINEAR_MIPMAP_NEAREST;
    case 4 : 
        return gl.NEAREST_MIPMAP_LINEAR;
    case 5 : 
        return gl.LINEAR_MIPMAP_LINEAR;
    
  }
}

export {
  getGlFilter ,
  
}
/* No side effect */
