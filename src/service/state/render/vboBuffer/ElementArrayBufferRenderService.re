open WonderWebgl.GlType;

open WonderWebgl.Gl;

open Js.Typed_array;

open StateRenderType;

let create16Buffer =
  (. gl, data, state) => {
    let buffer =
      PoolVboBufferService.getElementArrayBuffer(gl, state.vboBufferRecord);

    bindBuffer(getElementArrayBuffer(gl), buffer, gl);
    bufferUint16Data(
      getElementArrayBuffer(gl),
      data,
      getStaticDraw(gl),
      gl,
    );
    resetBuffer(getElementArrayBuffer(gl), Js.Nullable.null, gl);
    buffer;
  };

let create32Buffer =
  (. gl, data, state) => {
    let buffer =
      PoolVboBufferService.getElementArrayBuffer(gl, state.vboBufferRecord);

    bindBuffer(getElementArrayBuffer(gl), buffer, gl);
    bufferUint32Data(
      getElementArrayBuffer(gl),
      data,
      getStaticDraw(gl),
      gl,
    );
    resetBuffer(getElementArrayBuffer(gl), Js.Nullable.null, gl);
    buffer;
  };

let getOrCreate16Buffer =
    (gl, (geometryIndex, bufferMap), getDataFunc, state) =>
  GetVboBufferRenderService.getOrCreateIndexBuffer(
    gl,
    (geometryIndex, bufferMap, getDataFunc),
    create16Buffer,
    state,
  );

let getOrCreate32Buffer =
    (gl, (geometryIndex, bufferMap), getDataFunc, state) =>
  GetVboBufferRenderService.getOrCreateIndexBuffer(
    gl,
    (geometryIndex, bufferMap, getDataFunc),
    create32Buffer,
    state,
  );