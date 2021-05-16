


function drawElement(param, gl) {
  gl.drawElements(param[0], param[3], param[1], 0);
  return /* () */0;
}

function drawArray(drawMode, verticesCount, gl) {
  gl.drawArrays(drawMode, 0, verticesCount);
  return /* () */0;
}

function drawElementsInstancedANGLE(param, extension) {
  extension.drawElementsInstancedANGLE(param[0], param[3], param[1], 0, param[4]);
  return /* () */0;
}

export {
  drawElement ,
  drawArray ,
  drawElementsInstancedANGLE ,
  
}
/* No side effect */
