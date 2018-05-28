open StateDataMainType;

open WDType;

let _batchSetCustomGeometryData = () => {};

let _batchCreateCustomGeometry = () => {};

let _addChildrenToParent = (parent, children, (parentMap, childMap)) => (
  /* WonderLog.Contract.requireCheck(
       () => {
         open WonderLog;
         open Contract;
         open Operators;
         test(
           Log.buildAssertMessage(~expect={j|child not has parent|j}, ~actual={j|has|j}),
           () => getParent(child, record) |> assertNotExist
         );
         test(
           Log.buildAssertMessage(~expect={j|parent not already has the child|j}, ~actual={j|has|j}),
           () => unsafeGetChildren(parent, record) |> Js.Array.includes(child) |> assertFalse
         )
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     ); */
  children
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (parentMap, child) =>
           /* TODO duplicate with HierachyTransformService */
           WonderCommonlib.SparseMapService.set(
             child,
             TransformType.transformToJsUndefine(parent),
             parentMap
           )
       ),
       parentMap
     ),
  WonderCommonlib.SparseMapService.set(parent, children, childMap)
);

let _batchSetTransformParent = ({indices}, transformArr, state) => {
  let ({parentMap, childMap}: TransformType.transformRecord) as transformRecord =
    RecordTransformMainService.getRecord(state);
  let (parentMap, childMap) =
    indices.gameObjectIndices.childrenTransformIndices
    |> WonderCommonlib.ArrayService.reduceOneParami(
         [@bs]
         (
           (hierachyDataTuple, childrenTransforms, parentTransform) =>
             switch childrenTransforms {
             | None => hierachyDataTuple
             | Some(childrenTransforms) =>
               _addChildrenToParent(parentTransform, childrenTransforms, hierachyDataTuple)
             }
         ),
         (parentMap, childMap)
       );
  {...state, transformRecord: Some({...transformRecord, parentMap, childMap})}
};

let _batchSetTransformData = ({transforms}, transformArr, state) => {
  /* TODO set local rotation, scale */
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|transformArr->length === transforms->length|j},
                ~actual={j|not|j}
              ),
              () => transformArr |> Js.Array.length == (transforms |> Js.Array.length)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
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
               [@bs]
               (
                 (localPositions, {translation}, index) => {
                   let transform = transformArr[index];
                   RecordTransformMainService.setLocalPositionByTuple(
                     transform,
                     translation,
                     localPositions
                   )
                 }
               ),
               localPositions
             )
      })
  }
};

/* let _setDefaultChildren = (indexArr, childMap) =>
   indexArr
   |> WonderCommonlib.ArrayService.reduceOneParam(
        [@bs]
        (
          (childMap, index) =>
            WonderCommonlib.SparseMapService.set(
              index,
              WonderCommonlib.ArrayService.createEmpty(),
              childMap
            )
        ),
        childMap
      ); */
/* let _initTransformDataWhenCreate =
     (
       indexArr,
       (
         {
           childMap,
           localToWorldMatrices,
           localPositions,
           defaultLocalToWorldMatrix,
           defaultLocalPosition
         }: TransformType.transformRecord
       ) as transformRecord
     ) =>
   /* _isNotNeedInitData(index, childMap) ?
      transformRecord : */
   {...transformRecord, childMap: childMap |> _setDefaultChildren(indexArr)}; */
let _batchCreateTransform = ({transforms}, {settingRecord} as state) => {
  let ({index, disposedIndexArray}: TransformType.transformRecord) as transformRecord =
    RecordTransformMainService.getRecord(state);
  let newIndex = index + (transforms |> Js.Array.length);
  let indexArr = ArrayService.range(index, newIndex - 1);
  /* let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray); */
  transformRecord.index = newIndex;
  /* let transformRecord = _initTransformDataWhenCreate(indexArr, transformRecord); */
  /* transformRecord.disposedIndexArray = disposedIndexArray; */
  newIndex
  - 1
  |> BufferService.checkNotExceedMaxCountByIndex(
       BufferSettingService.getTransformCount(settingRecord)
     )
  |> ignore;
  state.transformRecord =
    Some(
      indexArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs]
           (
             (transformRecord, index) => transformRecord |> DirtyTransformService.mark(index, true)
           ),
           transformRecord
         )
    );
  (state, indexArr)
};

let _batchCreateGameObject = ({gameObjects}, {gameObjectRecord} as state) => {
  let {count}: gameObjects = gameObjects;
  let {uid, aliveUidArray}: GameObjectType.gameObjectRecord = gameObjectRecord;
  let uidArr = ArrayService.range(uid, uid + count - 1);
  /* gameObjectRecord.uid = uid + count;

     aliveUidArray |> Js.Array.concat(
         uidArr
     ); */
  (
    {
      ...state,
      gameObjectRecord: {
        ...gameObjectRecord,
        uid: uid + count,
        aliveUidArray: aliveUidArray |> Js.Array.concat(uidArr)
      }
    },
    uidArr
  )
};

let _buildSceneGameObject = ({scene}, gameObjectArr, {gameObjectRecord} as state) => {
  let gameObjects = scene.gameObjects;
  switch (gameObjects |> Js.Array.length) {
  | 1 =>
    /* TODO test */
    (state, Array.unsafe_get(gameObjectArr, gameObjects[0]))
  | _ =>
    let (state, gameObject) = CreateGameObjectMainService.create(state);
    let ({parentMap, childMap}: TransformType.transformRecord) as transformRecord =
      RecordTransformMainService.getRecord(state);
    let (parentMap, childMap) =
      _addChildrenToParent(
        GetComponentGameObjectService.unsafeGetTransformComponent(gameObject, gameObjectRecord),
        scene.gameObjects
        |> Js.Array.map(
             (gameObjectIndex) =>
               GetComponentGameObjectService.unsafeGetTransformComponent(
                 Array.unsafe_get(gameObjectArr, gameObjectIndex),
                 gameObjectRecord
               )
           ),
        (parentMap, childMap)
      );
    ({...state, transformRecord: Some({...transformRecord, parentMap, childMap})}, gameObject)
  }
};

let assemble = ((wdRecord, imageArr, bufferArr), state) => {
  let (state, gameObjectArr) = _batchCreateGameObject(wdRecord, state);
  let (state, transformArr) = _batchCreateTransform(wdRecord, state);
  let state =
    state
    |> _batchSetTransformData(wdRecord, transformArr)
    |> _batchSetTransformParent(wdRecord, transformArr)
    |> BatchAddGameObjectComponentMainService.batchAddTransformComponentForCreate(
         gameObjectArr,
         transformArr
       );
  _buildSceneGameObject(wdRecord, gameObjectArr, state)
};