

import * as PoolVboBufferService$Wonderjs from "../../../record/main/vboBuffer/PoolVboBufferService.js";
import * as GetVboBufferRenderService$Wonderjs from "./GetVboBufferRenderService.js";

function createBuffer(gl, data, state) {
  var buffer = PoolVboBufferService$Wonderjs.getArrayBuffer(gl, state[/* vboBufferRecord */1]);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return buffer;
}

function getOrCreateBuffer(gl, param, getDataFunc, state) {
  return GetVboBufferRenderService$Wonderjs.getOrCreateBuffer(gl, /* tuple */[
              param[0],
              param[1]
            ], /* tuple */[
              createBuffer,
              getDataFunc
            ], state);
}

export {
  createBuffer ,
  getOrCreateBuffer ,
  
}
/* PoolVboBufferService-Wonderjs Not a pure module */
