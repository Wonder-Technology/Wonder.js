open GlType;

open Gl;

open Js.Typed_array;

open VboBufferType;

/* todo optimize: use buffer pool */
let createBuffer =
  [@bs]
  (
    (gl, geometryIndex: int, data: Uint16Array.t, state: StateDataType.state) => {
      let buffer = VboBufferPoolSystem.getElementArrayBuffer(gl, state);
      bindBuffer(getElementArrayBuffer(gl), buffer, gl);
      bufferUint16Data(getElementArrayBuffer(gl), data, getStaticDraw(gl), gl);
      resetBuffer(getElementArrayBuffer(gl), Js.Nullable.null, gl);
      buffer
    }
  );

let getOrCreateBuffer = (gl, geometryIndex, bufferMap, getDataFunc, state: StateDataType.state) =>
  VboBufferSystem.getOrCreateBuffer(
    gl,
    geometryIndex,
    bufferMap,
    createBuffer,
    getDataFunc,
    state
  );