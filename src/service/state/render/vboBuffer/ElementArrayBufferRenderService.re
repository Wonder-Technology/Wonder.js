open WonderWebgl.GlType;

open WonderWebgl.Gl;

open Js.Typed_array;

open StateRenderType;

let createBuffer =
  [@bs]
  (
    (gl, record: Uint16Array.t, state) => {
      let buffer = PoolVboBufferService.getElementArrayBuffer(gl, state.vboBufferRecord);
      bindBuffer(getElementArrayBuffer(gl), buffer, gl);
      bufferUint16Data(getElementArrayBuffer(gl), record, getStaticDraw(gl), gl);
      resetBuffer(getElementArrayBuffer(gl), Js.Nullable.null, gl);
      buffer
    }
  );

let getOrCreateBuffer =
    (
      gl,
      (geometryIndex, bufferMap),
      getDataFunc,
      state
    ) =>
  GetVboBufferRenderService.getOrCreateBuffer(
    gl,
    (geometryIndex, bufferMap),
    (createBuffer, getDataFunc),
    state
  );