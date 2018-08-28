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

let _setGameObjectName = (sourceGameObject, clonedGameObjectArr, state) =>
  switch (NameGameObjectMainService.getName(sourceGameObject, state)) {
  | None => state
  | Some(name) =>
    clonedGameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. state, clonedGameObject) =>
           NameGameObjectMainService.setName(. clonedGameObject, name, state),
         state,
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
          state: StateDataMainType.state,
        ) => {
  let (gameObjectRecord, clonedGameObjectArr) =
    _createGameObjectArr(countRangeArr, state.gameObjectRecord);

  let state = _setGameObjectName(uid, clonedGameObjectArr, state);

  let totalClonedGameObjectArr =
    totalClonedGameObjectArr |> ArrayService.push(clonedGameObjectArr);
  let state = {...state, gameObjectRecord};
  let (state, clonedTransformArr) =
    CloneGameObjectComponentMainService.clone(
      (uid, transform, countRangeArr, clonedGameObjectArr),
      isShareMaterial,
      state,
    );
  state
  |> RecordTransformMainService.getRecord
  |> _setParent(clonedParentTransformArr, clonedTransformArr)
  |> HierachyTransformService.unsafeGetChildren(transform)
  |> ReduceStateMainService.reduceState(
       (. state, childTransform) =>
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
            ),
       state,
     );
  state;
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

  (
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
      state,
    ),
    totalClonedGameObjectArr,
  );
};