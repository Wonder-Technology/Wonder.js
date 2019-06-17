

import * as PoolVboBufferService$Wonderjs from "../../../record/main/vboBuffer/PoolVboBufferService.js";
import * as GetVboBufferRenderService$Wonderjs from "./GetVboBufferRenderService.js";

function create16Buffer(gl, data, state) {
  var buffer = PoolVboBufferService$Wonderjs.getElementArrayBuffer(gl, state[/* vboBufferRecord */1]);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  return buffer;
}

function create32Buffer(gl, data, state) {
  var buffer = PoolVboBufferService$Wonderjs.getElementArrayBuffer(gl, state[/* vboBufferRecord */1]);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  return buffer;
}

function getOrCreate16Buffer(gl, param, getDataFunc, state) {
  return GetVboBufferRenderService$Wonderjs.getOrCreateIndexBuffer(gl, /* tuple */[
              param[0],
              param[1],
              getDataFunc
            ], create16Buffer, state);
}

function getOrCreate32Buffer(gl, param, getDataFunc, state) {
  return GetVboBufferRenderService$Wonderjs.getOrCreateIndexBuffer(gl, /* tuple */[
              param[0],
              param[1],
              getDataFunc
            ], create32Buffer, state);
}

export {
  create16Buffer ,
  create32Buffer ,
  getOrCreate16Buffer ,
  getOrCreate32Buffer ,
  
}
/* PoolVboBufferService-Wonderjs Not a pure module */
