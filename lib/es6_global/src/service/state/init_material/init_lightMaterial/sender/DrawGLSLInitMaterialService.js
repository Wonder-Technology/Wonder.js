


function bindElementArrayBuffer(gl, _, buffer, renderState) {
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  return renderState;
}

export {
  bindElementArrayBuffer ,
  
}
/* No side effect */
