open GlType;

open Gl;

open Js.Typed_array;

open VboBufferType;

let createBuffer =
  [@bs]
  (
    (gl, geometryIndex: int, data: Float32Array.t, state: StateDataType.state) => {
      let buffer = VboBufferPoolSystem.getArrayBuffer(gl, state);
      bindBuffer(getArrayBuffer(gl), buffer, gl);
      bufferFloat32Data(getArrayBuffer(gl), data, getStaticDraw(gl), gl);
      resetBuffer(getArrayBuffer(gl), Js.Nullable.null, gl);
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