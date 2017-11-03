open GlType;

open Gl;

open Js.Typed_array;

/* todo optimize: use buffer pool */
let createBuffer = (gl, geometryIndex: int, data: Float32Array.t) => {
  let buffer = createBuffer(gl);
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  bufferFloat32Data(getArrayBuffer(gl), data, getStaticDraw(gl));
  resetBuffer(getArrayBuffer(gl), Js.Nullable.null);
  buffer;
};