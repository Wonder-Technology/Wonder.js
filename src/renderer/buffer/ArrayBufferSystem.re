open GlType;

open Gl;

open Js.Typed_array;

open VboBufferType;

let createBuffer =
  [@bs]
  (
    (gl, geometryDataGroup, data: Float32Array.t, state: StateDataType.state) =>
      switch (VboBufferPoolSystem.getArrayBuffer(gl, geometryDataGroup, state)) {
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
      geometryDataGroup: string,
      bufferMap,
      getDataFunc,
      state: StateDataType.state
    ) =>
  VboBufferSystem.getOrCreateBuffer(
    gl,
    geometryIndex,
    mappedGeometryIndex,
    geometryDataGroup,
    bufferMap,
    createBuffer,
    getDataFunc,
    state
  );