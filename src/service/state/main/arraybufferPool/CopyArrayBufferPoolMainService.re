open StateDataMainType;

open ArrayBufferPoolType;

open SettingType;

let _copyAllArrayBuffers = ({settingRecord} as state) => {
  let {
    customGeometryPointDataBufferCount,
    transformDataBufferCount,
    basicMaterialDataBufferCount,
    lightMaterialDataBufferCount
  } =
    BufferSettingService.unsafeGetBuffer(settingRecord);
  [
    (
      CustomGeometryArrayBuffer,
      BufferCustomGeometryService.createBuffer(customGeometryPointDataBufferCount)
    ),
    (TransformArrayBuffer, BufferTransformService.createBuffer(transformDataBufferCount)),
    (
      BasicMaterialArrayBuffer,
      BufferBasicMaterialService.createBuffer(basicMaterialDataBufferCount)
    ),
    (
      LightMaterialArrayBuffer,
      BufferLightMaterialService.createBuffer(lightMaterialDataBufferCount)
    ),
    (
      AmbientLightArrayBuffer,
      BufferAmbientLightService.createBuffer(BufferAmbientLightService.getBufferMaxCount())
    ),
    (
      DirectionLightArrayBuffer,
      BufferDirectionLightService.createBuffer(BufferDirectionLightService.getBufferMaxCount())
    )
  ]
};

let _getMapKey = (arrayBufferType) =>
  switch arrayBufferType {
  | CustomGeometryArrayBuffer => "customGeometryArrayBuffer"
  | TransformArrayBuffer => "transformArrayBuffer"
  | BasicMaterialArrayBuffer => "basicMaterialArrayBuffer"
  | LightMaterialArrayBuffer => "lightMaterialArrayBuffer"
  | AmbientLightArrayBuffer => "ambientLightArrayBuffer"
  | DirectionLightArrayBuffer => "directionLightArrayBuffer"
  | PointLightArrayBuffer => "pointLightArrayBuffer"
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getMapKey",
        ~description={j|invalid arrayBufferType:$arrayBufferType|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _addArrayBuffer = (poolMap, type_, arrayBuffer) => {
  let key = _getMapKey(type_);
  switch (poolMap |> WonderCommonlib.HashMapService.get(key)) {
  | None => poolMap |> WonderCommonlib.HashMapService.set(key, [])
  | Some(list) => poolMap |> WonderCommonlib.HashMapService.set(key, [arrayBuffer, ...list])
  }
};

let _addCopiedArrayBuffersToPool = (copiedArrayBufferList, {arrayBufferPoolRecord} as state) => {
  ...state,
  arrayBufferPoolRecord: {
    poolMap:
      copiedArrayBufferList
      |> List.fold_left(
           (poolMap, (type_, arrayBuffer)) => _addArrayBuffer(poolMap, type_, arrayBuffer),
           arrayBufferPoolRecord.poolMap
         )
  }
};

let copyAllArrayBuffersToPool = (count, {arrayBufferPoolRecord} as state) =>
  ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs] ((state, _) => state |> _addCopiedArrayBuffersToPool(_copyAllArrayBuffers(state))),
       state
     );

let copyArrayBuffer = (buffer, type_, {arrayBufferPoolRecord} as state) => {
  let key = _getMapKey(type_);
  switch (arrayBufferPoolRecord.poolMap |> WonderCommonlib.HashMapService.get(key)) {
  | None =>
    (state, CopyTypeArrayService.copySharedArrayBuffer(buffer))
  | Some(list) =>
    switch (list |> List.length) {
    | 0 => (state, CopyTypeArrayService.copySharedArrayBuffer(buffer))
    | _ => (
        {
          ...state,
          arrayBufferPoolRecord: {
            poolMap:
              arrayBufferPoolRecord.poolMap
              |> WonderCommonlib.HashMapService.set(key, list |> List.tl)
          }
        },
        list |> List.hd
      )
    }
  }
};