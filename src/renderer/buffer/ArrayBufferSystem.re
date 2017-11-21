open GlType;

open Gl;

open Js.Typed_array;

open VboBufferType;

/* todo optimize: use buffer pool */
let createBuffer =
  [@bs]
  (
    (gl, geometryIndex: int, data: Float32Array.t) => {
      let buffer = createBuffer(gl);
      bindBuffer(getArrayBuffer(gl), buffer, gl);
      bufferFloat32Data(getArrayBuffer(gl), data, getStaticDraw(gl), gl);
      resetBuffer(getArrayBuffer(gl), Js.Nullable.null, gl);
      buffer
    }
  );

let getOrCreateBuffer = (gl, geometryIndex, bufferMap, getDataFunc, state: StateDataType.state) =>
  VboBufferSystem.getOrCreateBuffer(
    gl,
    geometryIndex,
    bufferMap,
    createBuffer,
    getDataFunc,
    state
  );
/* switch (WonderCommonlib.HashMapSystem.get(geometryIndex, bufferMap)) {
   | Some(buffer) => buffer
   | None =>
     let buffer =
       createBuffer(gl, geometryIndex, getDataFunc(geometryIndex, state));
     bufferMap
     |> WonderCommonlib.HashMapSystem.set(Js.Int.toString(geometryIndex), buffer)
     |> ignore;
     buffer
   }; */