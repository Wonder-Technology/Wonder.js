open StateDataMainType;

open WDType;

open Js.Typed_array;

let _getBatchArrByIndices = (sourceArr, indices) =>
  indices |> Js.Array.map(index => Array.unsafe_get(sourceArr, index));

let _getBatchComponentGameObjectData =
    ((gameObjectArr, transformArr, customGeometryArr), indices) => {
  let parentTransforms =
    indices.gameObjectIndices.childrenTransformIndexData.parentTransformIndices
    |> _getBatchArrByIndices(transformArr);
  let childrenTransforms =
    indices.gameObjectIndices.childrenTransformIndexData.
      childrenTransformIndices
    |> Js.Array.map(childrenIndices =>
         childrenIndices
         |> Js.Array.map(index => Array.unsafe_get(transformArr, index))
       );
  let transformGameObjects =
    indices.gameObjectIndices.transformGameObjectIndexData.gameObjectIndices
    |> _getBatchArrByIndices(gameObjectArr);
  let gameObjectTransforms =
    indices.gameObjectIndices.transformGameObjectIndexData.componentIndices
    |> _getBatchArrByIndices(transformArr);
  let customGeometryGameObjects =
    indices.gameObjectIndices.customGeometryGameObjectIndexData.
      gameObjectIndices
    |> _getBatchArrByIndices(gameObjectArr);
  let gameObjectCustomGeometrys =
    indices.gameObjectIndices.customGeometryGameObjectIndexData.
      componentIndices
    |> _getBatchArrByIndices(customGeometryArr);
  (
    parentTransforms,
    childrenTransforms,
    transformGameObjects,
    gameObjectTransforms,
    customGeometryGameObjects,
    gameObjectCustomGeometrys,
  );
};

let _getAccessorTypeSize = ({type_}) =>
  switch (type_) {
  | SCALAR => 1
  | VEC2 => 2
  | VEC3 => 3
  | VEC4 => 4
  | MAT2 => 4
  | MAT3 => 9
  | MAT4 => 16
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getAccessorTypeSize",
        ~description={j|unknown type_:$type_ |j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let _getBufferData =
    (
      accessorIndex,
      bufferArr,
      {accessors, bufferViews, buffers},
      (_BYTES_PER_ELEMENT, fromBufferRangeFunc),
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|not support interleaved buffer data|j},
                ~actual={j|is interleaved|j},
              ),
              () => {
                let accessor = Array.unsafe_get(accessors, accessorIndex);
                let bufferView =
                  Array.unsafe_get(bufferViews, accessor.bufferView);
                switch (bufferView.byteStride) {
                | Some(byteStride) =>
                  byteStride == _getAccessorTypeSize(accessor)
                  * _BYTES_PER_ELEMENT
                | None => ()
                };
              },
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  let accessor = Array.unsafe_get(accessors, accessorIndex);
  let bufferView = Array.unsafe_get(bufferViews, accessor.bufferView);
  fromBufferRangeFunc(
    Array.unsafe_get(bufferArr, bufferView.buffer),
    ~offset=accessor.byteOffset + bufferView.byteOffset,
    ~length=accessor.count * _getAccessorTypeSize(accessor),
  );
};

let _getBufferAttributeData = (accessorIndex, bufferArr, wdRecord) =>
  _getBufferData(
    accessorIndex,
    bufferArr,
    wdRecord,
    (Float32Array._BYTES_PER_ELEMENT, Float32Array.fromBufferRange),
  );

let _getBufferIndexData = (accessorIndex, bufferArr, wdRecord) =>
  _getBufferData(
    accessorIndex,
    bufferArr,
    wdRecord,
    (Uint16Array._BYTES_PER_ELEMENT, Uint16Array.fromBufferRange),
  );

let _batchSetCustomGeometryData =
    ({customGeometrys} as wdRecord, customGeometryArr, bufferArr, state) =>
  /* TODO optimize: first get all customGeometry point data; then batch set?(need benchmark test) */
  customGeometrys
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, geometryData, geometryIndex) =>
         switch (geometryData) {
         | None => state
         | Some(({position, normal, texCoord, index}: WDType.customGeometry)) =>
           let customGeometry =
             Array.unsafe_get(customGeometryArr, geometryIndex);
           let state =
             VerticesCustomGeometryMainService.setVerticesByTypeArray(
               customGeometry,
               _getBufferAttributeData(position, bufferArr, wdRecord),
               state,
             );
           let state =
             switch (normal) {
             | None => state
             | Some(normal) =>
               NormalsCustomGeometryMainService.setNormalsByTypeArray(
                 customGeometry,
                 _getBufferAttributeData(normal, bufferArr, wdRecord),
                 state,
               )
             };
           let state =
             switch (texCoord) {
             | None => state
             | Some(texCoord) =>
               TexCoordsCustomGeometryMainService.setTexCoordsByTypeArray(
                 customGeometry,
                 _getBufferAttributeData(texCoord, bufferArr, wdRecord),
                 state,
               )
             };
           let state =
             IndicesCustomGeometryMainService.setIndicesByTypeArray(
               customGeometry,
               _getBufferIndexData(index, bufferArr, wdRecord),
               state,
             );
           state;
         },
       state,
     );

let _batchSetTransformParent = (parentTransforms, childrenTransforms, state) => {
  let ({parentMap, childMap}: TransformType.transformRecord) as transformRecord =
    RecordTransformMainService.getRecord(state);
  let (parentMap, childMap) =
    parentTransforms
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. hierachyDataTuple, parentTransform, index) =>
           AssembleCommon.addChildrenToParent(
             parentTransform,
             Array.unsafe_get(childrenTransforms, index),
             hierachyDataTuple,
           ),
         (parentMap, childMap),
       );
  {
    ...state,
    transformRecord: Some({...transformRecord, parentMap, childMap}),
  };
};

let _batchSetTransformData = ({transforms}, gameObjectTransforms, state) => {
  /* TODO set local rotation, scale */
  let ({localPositions}: TransformType.transformRecord) as transformRecord =
    RecordTransformMainService.getRecord(state);
  {
    ...state,
    transformRecord:
      Some({
        ...transformRecord,
        localPositions:
          transforms
          |> WonderCommonlib.ArrayService.reduceOneParami(
               (. localPositions, {translation}, index) =>
                 switch (translation) {
                 | None => localPositions
                 | Some(translation) =>
                   let transform = gameObjectTransforms[index];
                   RecordTransformMainService.setLocalPositionByTuple(
                     transform,
                     translation,
                     localPositions,
                   );
                 },
               localPositions,
             ),
      }),
  };
};

let batchOperate =
    (
      {indices} as wdRecord,
      bufferArr,
      (state, gameObjectArr, (transformArr, customGeometryArr)),
    ) => {
  let (
    parentTransforms,
    childrenTransforms,
    transformGameObjects,
    gameObjectTransforms,
    customGeometryGameObjects,
    gameObjectCustomGeometrys,
  ) =
    _getBatchComponentGameObjectData(
      (gameObjectArr, transformArr, customGeometryArr),
      indices,
    );
  (
    state
    |> _batchSetTransformData(wdRecord, gameObjectTransforms)
    |> _batchSetTransformParent(parentTransforms, childrenTransforms)
    |> _batchSetCustomGeometryData(wdRecord, customGeometryArr, bufferArr)
    |> BatchAddGameObjectComponentMainService.batchAddTransformComponentForCreate(
         transformGameObjects,
         gameObjectTransforms,
       )
    |> BatchAddGameObjectComponentMainService.batchAddCustomGeometryComponentForCreate(
         customGeometryGameObjects,
         gameObjectCustomGeometrys,
       ),
    gameObjectArr,
  );
};