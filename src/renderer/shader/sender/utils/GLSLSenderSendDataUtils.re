open StateDataType;

open GlType;

open Gl;

open GLSLSenderStateUtils;

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

let _enableVertexAttribArray = (gl, pos, vertexAttribHistoryArray, state) =>
  WonderCommonlib.ArraySystem.isNotEqual(pos, true, vertexAttribHistoryArray) ?
    {
      enableVertexAttribArray(pos, gl);
      Array.unsafe_set(vertexAttribHistoryArray, pos, true);
      state
    } :
    state;

let sendBuffer =
  [@bs]
  (
    (gl, (size: int, pos: attributeLocation), buffer: buffer, state: StateDataType.state) => {
      let {vertexAttribHistoryArray} as data = getGLSLSenderData(state);
      bindBuffer(getArrayBuffer(gl), buffer, gl);
      vertexAttribPointer(pos, size, getFloat(gl), Js.false_, 0, 0, gl);
      _enableVertexAttribArray(gl, pos, vertexAttribHistoryArray, state)
    }
  );

let sendMatrix3 =
  [@bs]
  (
    (gl, pos: uniformLocation, data: Js.Typed_array.Float32Array.t) =>
      uniformMatrix3fv(pos, Js.false_, data, gl)
  );

let sendMatrix4 =
  [@bs]
  (
    (gl, pos: uniformLocation, data: Js.Typed_array.Float32Array.t) =>
      uniformMatrix4fv(pos, Js.false_, data, gl)
  );

let _getCache = (shaderCacheMap, name: string) =>
  shaderCacheMap |> WonderCommonlib.HashMapSystem.get(name);

let _setCache = (shaderCacheMap, name: string, data) =>
  shaderCacheMap |> WonderCommonlib.HashMapSystem.set(name, data);

let getCacheMap = (shaderIndex: int, {uniformCacheMap}) =>
  uniformCacheMap |> WonderCommonlib.SparseMapSystem.get(shaderIndex);

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

/* TODO test */
let sendFloat =
  [@bs]
  (
    (gl, shaderCacheMap: GLSLSenderType.shaderCacheMap, (name: string, pos: uniformLocation), value) =>
      if (_isNotCacheFloat(shaderCacheMap |> Obj.magic, name, value)) {
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
        uniform3f(pos, x, y, z, gl)
      } else {
        ()
      }
  );