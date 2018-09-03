open WonderWebgl.GlType;

open WonderWebgl.Gl;

let getBufferSizeByType = (type_: string) =>
  switch (type_) {
  | "vec2" => 2
  | "vec3" => 3
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getBufferSizeByType",
        ~description={j|invalide type_: $type_|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let enableVertexAttribArray = (gl, pos, vertexAttribHistoryArray) =>
  WonderCommonlib.ArrayService.isNotEqual(pos, true, vertexAttribHistoryArray) ?
    {
      enableVertexAttribArray(pos, gl);
      Array.unsafe_set(vertexAttribHistoryArray, pos, true);
      ();
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
       vertexAttribPointer(pos, size, getFloat(gl), false, 0, 0, gl);
       enableVertexAttribArray(gl, pos, glslSenderRecord.vertexAttribHistoryArray)
     }
   ); */
let sendMatrix3 =
  (. gl, pos: uniformLocation, data: Js.Typed_array.Float32Array.t) =>
    /* WonderLog.Log.log(("send matrix3: ", data)) |> ignore; */
    uniformMatrix3fv(pos, false, data, gl);

let sendMatrix4 =
  (. gl, pos: uniformLocation, data: Js.Typed_array.Float32Array.t) =>
    /* WonderLog.Log.log(("send matrix4: ", data)) |> ignore; */
    uniformMatrix4fv(pos, false, data, gl);

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
    isNotCached := true;
  };
  if (Array.unsafe_get(cache, 1) !== y) {
    Array.unsafe_set(cache, 1, y);
    isNotCached := true;
  };
  if (Array.unsafe_get(cache, 2) !== z) {
    Array.unsafe_set(cache, 2, z);
    isNotCached := true;
  };
  isNotCached^;
};

let _isNotCacheVector3AndSetCache =
    (shaderCacheMap, name: string, (x: float, y: float, z: float)) =>
  switch (_getCache(shaderCacheMap, name)) {
  | None =>
    _setCache(shaderCacheMap, name, [|x, y, z|]) |> ignore;
    true;
  | Some(cache) => _queryIsNotCacheWithCache(cache, x, y, z)
  };

let _isNotCacheNumberAndSetCache = (shaderCacheMap, name: string, value) =>
  switch (_getCache(shaderCacheMap, name)) {
  | Some(cache) when cache === value => false
  | _ =>
    _setCache(shaderCacheMap, name, value) |> ignore;
    true;
  };

let sendFloat =
  (.
    gl,
    shaderCacheMap: GLSLSenderType.shaderCacheMap,
    (name: string, pos: uniformLocation),
    value,
  ) =>
    if (_isNotCacheNumberAndSetCache(shaderCacheMap |> Obj.magic, name, value)) {
      /* WonderLog.Log.log(("send float1: ", name, value)) |> ignore; */
      uniform1f(
        pos,
        value,
        gl,
      );
    } else {
      ();
    };

let sendInt =
  (.
    gl,
    shaderCacheMap: GLSLSenderType.shaderCacheMap,
    (name: string, pos: uniformLocation),
    value: int,
  ) =>
    if (_isNotCacheNumberAndSetCache(shaderCacheMap |> Obj.magic, name, value)) {
      uniform1i(pos, value, gl);
    } else {
      ();
    };

let sendFloat3 =
  (.
    gl,
    shaderCacheMap: GLSLSenderType.shaderCacheMap,
    (name: string, pos: uniformLocation),
    valueArr,
  ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|valueArr.length === 3|j},
                  ~actual={j|not|j},
                ),
                () =>
                valueArr |> Js.Array.length == 3
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );

    let x = valueArr[0];
    let y = valueArr[1];
    let z = valueArr[2];

    if (_isNotCacheVector3AndSetCache(shaderCacheMap, name, (x, y, z))) {
      /* WonderLog.Log.log(("send float3: ", name, (x, y, z))) |> ignore; */
      uniform3f(
        pos,
        x,
        y,
        z,
        gl,
      );
    } else {
      ();
    };
  };

let sendVec3 =
  (.
    gl,
    shaderCacheMap: GLSLSenderType.shaderCacheMap,
    (name: string, pos: uniformLocation),
    (x, y, z) as dataTuple,
  ) =>
    if (_isNotCacheVector3AndSetCache(shaderCacheMap, name, dataTuple)) {
      /* WonderLog.Log.log(("send vec3: ", name, dataTuple)) |> ignore; */
      uniform3f(
        pos,
        x,
        y,
        z,
        gl,
      );
    } else {
      ();
    };