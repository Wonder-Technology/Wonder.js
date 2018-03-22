open GlType;

open Gl;

open Js.Typed_array;

open VboBufferType;

let createBuffer =
  [@bs]
  (
    (gl, record: Float32Array.t, state: MainStateDataType.state) => {
      let buffer = PoolVboBufferService.getArrayBuffer(gl, state.vboBufferRecord);
      bindBuffer(getArrayBuffer(gl), buffer, gl);
      bufferFloat32Data(getArrayBuffer(gl), record, getStaticDraw(gl), gl);
      resetBuffer(getArrayBuffer(gl), Js.Nullable.null, gl);
      buffer
    }
  );

let getOrCreateBuffer =
    (
      gl,
      (geometryIndex, mappedGeometryIndex, bufferMap),
      getDataFunc,
      state: MainStateDataType.state
    ) =>
  GetVboBufferMainService.getOrCreateBuffer(
    gl,
    (geometryIndex, mappedGeometryIndex, bufferMap),
    (createBuffer, getDataFunc),
    state
  );