open StateDataMainType;

open StateDataMainType;

let _createGameObjectArr = (countRangeArr, gameObjectRecord) =>
  countRangeArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (gameObjectRecord, clonedGameObjectArr), _) => {
         let (gameObjectRecord, gameObject) =
           CreateGameObjectGameObjectService.create(gameObjectRecord);
         (
           gameObjectRecord,
           clonedGameObjectArr |> ArrayService.push(gameObject),
         );
       },
       (gameObjectRecord, [||]),
     );

let _setParent =
    (clonedParentTransformArr, clonedTransformArr, transformRecord) =>
  clonedParentTransformArr
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. transformRecord, clonedParentTransform, i) =>
         transformRecord
         |> HierachyTransformService.setParentNotMarkDirty(
              Some(clonedParentTransform),
              clonedTransformArr[i],
            ),
       transformRecord,
     );

let _setGameObjectName = (sourceGameObject, clonedGameObjectArr, nameMap) =>
  switch (NameService.getName(sourceGameObject, nameMap)) {
  | None => nameMap
  | Some(name) =>
    clonedGameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. nameMap, clonedGameObject) =>
           NameService.setName(clonedGameObject, name, nameMap),
         nameMap,
       )
  };

let rec _clone =
        (
          (
            uid: int,
            transform,
            countRangeArr,
            clonedParentTransformArr,
            totalClonedGameObjectArr,
          ),
          isShareMaterial,
          nameMap,
          state: StateDataMainType.state,
        ) => {
  let (gameObjectRecord, clonedGameObjectArr) =
    _createGameObjectArr(countRangeArr, state.gameObjectRecord);

  let nameMap = _setGameObjectName(uid, clonedGameObjectArr, nameMap);

  let totalClonedGameObjectArr =
    totalClonedGameObjectArr |> ArrayService.push(clonedGameObjectArr);
  let state = {...state, gameObjectRecord};
  let (state, clonedTransformArr) =
    CloneGameObjectComponentMainService.clone(
      (uid, transform, countRangeArr, clonedGameObjectArr),
      isShareMaterial,
      state,
    );

  let transformRecord =
    state
    |> RecordTransformMainService.getRecord
    |> _setParent(clonedParentTransformArr, clonedTransformArr);

  state.transformRecord = Some(transformRecord);

  state
  |> RecordTransformMainService.getRecord
  |> HierachyTransformService.unsafeGetChildren(transform)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (nameMap, state), childTransform) =>
         state
         |> _clone(
              (
                state
                |> RecordTransformMainService.getRecord
                |> GameObjectTransformService.unsafeGetGameObject(
                     childTransform,
                   ),
                childTransform,
                countRangeArr,
                clonedTransformArr,
                totalClonedGameObjectArr,
              ),
              isShareMaterial,
              nameMap,
            ),
       (nameMap, state),
     );
};

/* {
                   cloneChildren:true,
                   ////cloneGeometry:true
                   shareGeometry:true
   } */
let clone =
    (
      uid: int,
      count: int,
      isShareMaterial: bool,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(
          ~expect={j|not clone sourceInstance gameObject|j},
          ~actual={j|do|j},
        ),
        () =>
        HasComponentGameObjectService.hasSourceInstanceComponent(
          uid,
          state.gameObjectRecord,
        )
        |> assertFalse
      );
      test(
        Log.buildAssertMessage(
          ~expect={j|not clone objectInstance gameObject|j},
          ~actual={j|do|j},
        ),
        () =>
        HasComponentGameObjectService.hasObjectInstanceComponent(
          uid,
          state.gameObjectRecord,
        )
        |> assertFalse
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  let totalClonedGameObjectArr = [||];

  let (nameMap, state) =
    _clone(
      (
        uid,
        GetComponentGameObjectService.getTransformComponent(.
          uid,
          state.gameObjectRecord,
        )
        |> OptionService.unsafeGet,
        ArrayService.range(0, count - 1),
        [||],
        totalClonedGameObjectArr,
      ),
      isShareMaterial,
      NameGameObjectMainService.getCopiedNameMap(state),
      state,
    );

  (
    NameGameObjectMainService.setNameMap(nameMap, state),
    totalClonedGameObjectArr,
  );
};