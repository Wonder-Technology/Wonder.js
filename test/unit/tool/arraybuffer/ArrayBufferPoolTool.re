open StateDataMainType;

open Js.Typed_array;

let getPoolMap = (state) => state.arrayBufferPoolRecord.poolMap;

let getMapKey = (type_) => CopyArrayBufferPoolMainService._getMapKey(type_);

let getBufferList = (type_, state) => {
  let key = getMapKey(type_);
  let poolMap = getPoolMap(state);
  getPoolMap(state) |> WonderCommonlib.HashMapService.unsafeGet(key)
};

let getFirstBuffer = (type_, state) => {
  let key = getMapKey(type_);
  switch (getBufferList(type_, state)) {
  | list when list |> List.length === 0 =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getFirstBuffer",
        ~description={j|no buffer in the list with type_:$key|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  | list => list |> List.hd
  }
};

let isBufferEqual = (buffer1, buffer2) =>
  ArrayBuffer.byteLength(buffer1 |> Worker.sharedArrayBufferToArrayBuffer)
  === ArrayBuffer.byteLength(buffer2 |> Worker.sharedArrayBufferToArrayBuffer);

let createArrayBuffer = (byteLength) => Worker.newSharedArrayBuffer(byteLength);

let copyArrayBuffer = (buffer, type_, state) =>
  CopyArrayBufferPoolMainService.copyArrayBuffer(buffer, type_, state);

let createSourceTransformArrayBuffer = (count, state) =>
  RecordTransformMainService._initBufferData(
    count,
    TransformTool.getDefaultLocalToWorldMatrix(state),
    TransformTool.getDefaultLocalPosition(state)
  );

let createTransformTypeArray = CreateTypeArrayTransformService.createTypeArrays;