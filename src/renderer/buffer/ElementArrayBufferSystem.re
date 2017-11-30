open GlType;

open Gl;

open Js.Typed_array;

open VboBufferType;

let createBuffer =
  [@bs]
  (
    (gl, group:int, data: Uint16Array.t, state: StateDataType.state) =>
      switch (VboBufferPoolSystem.getElementArrayBuffer(gl, group, state)) {
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
      group:int,
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