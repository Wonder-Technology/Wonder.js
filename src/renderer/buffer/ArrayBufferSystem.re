open GlType;

open Gl;

open Js.Typed_array;

open VboBufferType;

let createBuffer =
  [@bs]
  (
    (gl, group:int, data: Float32Array.t, state: StateDataType.state) =>
      switch (VboBufferPoolSystem.getArrayBuffer(gl, group, state)) {
      | (buffer, false) => buffer
      | (buffer, true) =>
        bindBuffer(getArrayBuffer(gl), buffer, gl);
        bufferFloat32Data(getArrayBuffer(gl), data, getStaticDraw(gl), gl);
        resetBuffer(getArrayBuffer(gl), Js.Nullable.null, gl);
        buffer
      }
  );

let getOrCreateBuffer =
    (
      gl,
      geometryIndex,
      mappedGeometryIndex,
      group,
      bufferMap,
      getDataFunc,
      state: StateDataType.state
    ) =>
  VboBufferSystem.getOrCreateBuffer(
    gl,
    geometryIndex,
    mappedGeometryIndex,
    group,
    bufferMap,
    createBuffer,
    getDataFunc,
    state
  );