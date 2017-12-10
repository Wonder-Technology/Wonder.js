open GlType;

open Gl;

open Js.Typed_array;

open VboBufferType;

let createBuffer =
  [@bs]
  (
    (gl, data: Uint16Array.t, state: StateDataType.state) => {
      let buffer = VboBufferPoolCommon.getElementArrayBuffer(gl, state);
      bindBuffer(getElementArrayBuffer(gl), buffer, gl);
      bufferUint16Data(getElementArrayBuffer(gl), data, getStaticDraw(gl), gl);
      resetBuffer(getElementArrayBuffer(gl), Js.Nullable.null, gl);
      buffer
    }
  );

let getOrCreateBuffer =
    (gl, geometryIndex, mappedGeometryIndex, bufferMap, getDataFunc, state: StateDataType.state) =>
  VboBufferSystem.getOrCreateBuffer(
    gl,
    geometryIndex,
    mappedGeometryIndex,
    bufferMap,
    createBuffer,
    getDataFunc,
    state
  );