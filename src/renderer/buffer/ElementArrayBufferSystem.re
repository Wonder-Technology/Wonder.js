open GlType;

open Gl;

open Js.Typed_array;

open VboBufferType;

let createBuffer =
  [@bs]
  (
    (gl, geometryGroup, data: Uint16Array.t, state: StateDataType.state) =>
      switch (VboBufferPoolSystem.getElementArrayBuffer(gl, geometryGroup, state)) {
      | (buffer, false) => buffer
      | (buffer, true) =>
        bindBuffer(getElementArrayBuffer(gl), buffer, gl);
        bufferUint16Data(getElementArrayBuffer(gl), data, getStaticDraw(gl), gl);
        resetBuffer(getElementArrayBuffer(gl), Js.Nullable.null, gl);
        buffer
      }
  );

let getOrCreateBuffer =
    (
      gl,
      geometryIndex,
      mappedGeometryIndex,
      geometryGroup,
      bufferMap,
      getDataFunc,
      state: StateDataType.state
    ) =>
  VboBufferSystem.getOrCreateBuffer(
    gl,
    geometryIndex,
    mappedGeometryIndex,
    geometryGroup,
    bufferMap,
    createBuffer,
    getDataFunc,
    state
  );