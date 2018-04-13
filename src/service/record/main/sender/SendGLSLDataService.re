open GlType;

open Gl;

open StateRenderType;

let getBufferSizeByType = (type_: string) =>
  switch type_ {
  /* | "vec2" => 2 */
  | "vec3" => 3
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getBufferSizeByType",
        ~description={j|invalide type_: $type_|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let enableVertexAttribArray = (gl, pos, vertexAttribHistoryArray) =>
  WonderCommonlib.ArrayService.isNotEqual(pos, true, vertexAttribHistoryArray) ?
    {
      enableVertexAttribArray(pos, gl);
      Array.unsafe_set(vertexAttribHistoryArray, pos, true);
      ()
    } :
    ();

/* let sendBuffer =
   [@bs]
   (
     (
       gl,
       (size: int, pos: attributeLocation),
       buffer: buffer,
       /* {vertexAttribHistoryArray}: StateRenderType.sendAttributeState */
       {glslSenderRecord}
     ) => {
       bindBuffer(getArrayBuffer(gl), buffer, gl);
       vertexAttribPointer(pos, size, getFloat(gl), Js.false_, 0, 0, gl);
       enableVertexAttribArray(gl, pos, glslSenderRecord.vertexAttribHistoryArray)
     }
   ); */
let sendMatrix3 =
  [@bs]
  (
    (gl, pos: uniformLocation, data: Js.Typed_array.Float32Array.t) => {
      /*WonderLog.Log.print(("send matrix3: ", data)) |> ignore;*/
      uniformMatrix3fv(pos, Js.false_, data, gl)
    }
  );

let sendMatrix4 =
  [@bs]
  (
    (gl, pos: uniformLocation, data: Js.Typed_array.Float32Array.t) => {
      /* WonderLog.Log.print(("send matrix4: ", data |> Js.Typed_array.Float32Array.sliceFrom(0))) |> ignore; */
      uniformMatrix4fv(pos, Js.false_, data, gl)
    }
  );

let _getCache = (shaderCacheMap, name: string) =>
  shaderCacheMap |> WonderCommonlib.HashMapService.get(name);

let _setCache = (shaderCacheMap, name: string, record) =>
  shaderCacheMap |> WonderCommonlib.HashMapService.set(name, record);

let getCacheMap = (shaderIndex: int, uniformCacheMap) =>
  uniformCacheMap |> WonderCommonlib.SparseMapService.get(shaderIndex);

let _queryIsNotCacheWithCache = (cache, x, y, z) => {
  let isNotCached = ref(false);
  if (Array.unsafe_get(cache, 0) !== x) {
    Array.unsafe_set(cache, 0, x);
    isNotCached := true
  };
  if (Array.unsafe_get(cache, 1) !== y) {
    Array.unsafe_set(cache, 1, y);
    isNotCached := true
  };
  if (Array.unsafe_get(cache, 2) !== z) {
    Array.unsafe_set(cache, 2, z);
    isNotCached := true
  };
  isNotCached^
};

let _isNotCacheVector3 = (shaderCacheMap, name: string, (x: float, y: float, z: float)) =>
  switch (_getCache(shaderCacheMap, name)) {
  | None =>
    _setCache(shaderCacheMap, name, [|x, y, z|]) |> ignore;
    true
  | Some(cache) => _queryIsNotCacheWithCache(cache, x, y, z)
  };

let _isNotCacheFloat = (shaderCacheMap, name: string, value: float) =>
  switch (_getCache(shaderCacheMap, name)) {
  | None =>
    _setCache(shaderCacheMap, name, value) |> ignore;
    true
  | Some(cache) => cache !== value
  };

let sendFloat =
  [@bs]
  (
    (gl, shaderCacheMap: GLSLSenderType.shaderCacheMap, (name: string, pos: uniformLocation), value) =>
      if (_isNotCacheFloat(shaderCacheMap |> Obj.magic, name, value)) {
        /*WonderLog.Log.print(("send float1: ", name, value)) |> ignore;*/
        uniform1f(pos, value, gl)
      } else {
        ()
      }
  );

let sendFloat3 =
  [@bs]
  (
    (
      gl,
      shaderCacheMap: GLSLSenderType.shaderCacheMap,
      (name: string, pos: uniformLocation),
      [|x, y, z|]
    ) =>
      if (_isNotCacheVector3(shaderCacheMap, name, (x, y, z))) {
        /*WonderLog.Log.print(("send float3: ", name, (x, y, z))) |> ignore;*/
        uniform3f(pos, x, y, z, gl)
      } else {
        ()
      }
  );

let sendVec3 =
  [@bs]
  (
    (
      gl,
      shaderCacheMap: GLSLSenderType.shaderCacheMap,
      (name: string, pos: uniformLocation),
      (x, y, z) as dataTuple
    ) =>
      if (_isNotCacheVector3(shaderCacheMap, name, dataTuple)) {
        /*WonderLog.Log.print(( "send vec3: ", name, dataTuple )) |> ignore;*/
        uniform3f(pos, x, y, z, gl)
      } else {
        ()
      }
  );