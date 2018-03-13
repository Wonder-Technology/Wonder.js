
open GlType;

open Gl;

open Js.Typed_array;

open VboBufferType;

let createBuffer =
  [@bs]
  (
    (gl, record: Float32Array.t, state: StateDataType.state) => {
      let buffer = PoolVboBufferService.getArrayBuffer(gl, state.vboBufferRecord);
      bindBuffer(getArrayBuffer(gl), buffer, gl);
      bufferFloat32Data(getArrayBuffer(gl), record, getStaticDraw(gl), gl);
      resetBuffer(getArrayBuffer(gl), Js.Nullable.null, gl);
      buffer
    }
  );

let getOrCreateBuffer = (gl, (geometryIndex, bufferMap), getDataFunc, state: StateDataType.state) =>
  GetVboBufferService.getOrCreateBuffer(
    gl,
    (geometryIndex, bufferMap),
    (createBuffer, getDataFunc),
    state
  );