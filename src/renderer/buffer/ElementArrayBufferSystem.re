open GlType;

open Gl;

open Js.Typed_array;

/* todo optimize: use buffer pool */
let createBuffer = (gl, geometryIndex: int, data: Uint16Array.t) => {
  let buffer = createBuffer(gl);
  bindBuffer(getElementArrayBuffer(gl), buffer, gl);
  bufferUint16Data(getElementArrayBuffer(gl), data, getStaticDraw(gl), gl);
  resetBuffer(getElementArrayBuffer(gl), Js.Nullable.null, gl);
  buffer
};