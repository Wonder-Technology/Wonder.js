open StateDataType;

open GameObjectType;

let _createGameObjectArr = (countRangeArr, gameObjectRecord) =>
  countRangeArr
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         ((gameObjectRecord, clonedGameObjectArr), _) => {
           let (gameObjectRecord, gameObject) =
             CreateGameObjectGameObjectService.create(gameObjectRecord);
           (gameObjectRecord, clonedGameObjectArr |> ArrayService.push(gameObject))
         }
       ),
       (gameObjectRecord, [||])
     );

let _setParent = (clonedParentTransformArr, clonedTransformArr, transformRecord) =>
  clonedParentTransformArr
  |> WonderCommonlib.ArraySystem.reduceOneParami(
       [@bs]
       (
         (transformRecord, clonedParentTransform, i) =>
           transformRecord
           |> HierachyTransformService.setParentNotMarkDirty(
                Some(clonedParentTransform),
                clonedTransformArr[i]
              )
       ),
       transformRecord
     );

let rec _clone =
        (
          (uid: int, transform, countRangeArr, clonedParentTransformArr, totalClonedGameObjectArr),
          isShareMaterial,
          state: StateDataType.state
        ) => {
  /* TODO add gameObjectRecord to state */
  let (gameObjectRecord, clonedGameObjectArr) =
    _createGameObjectArr(countRangeArr, state.gameObjectRecord);
  let totalClonedGameObjectArr =
    totalClonedGameObjectArr |> ArrayService.push(clonedGameObjectArr);
  let (state, clonedTransformArr) =
    CloneGameObjectComponentMainService.clone(
      (uid, transform, countRangeArr, clonedGameObjectArr),
      isShareMaterial,
      state
    );
  state.transformRecord
  |> _setParent(clonedParentTransformArr, clonedTransformArr)
  |> HierachyTransformService.unsafeGetChildren(transform)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, childTransform) =>
           state
           |> _clone(
                (
                  state.transformRecord
                  |> GameObjectTransformService.unsafeGetGameObject(childTransform),
                  childTransform,
                  countRangeArr,
                  clonedTransformArr,
                  totalClonedGameObjectArr
                ),
                isShareMaterial
              )
       ),
       state
     );
  state
};

/* {
                   cloneChildren:true,
                   cloneGeometry:true
                   ////shareGeometry:false
   } */
let clone = (uid: int, count: int, isShareMaterial: bool, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(
          ~expect={j|not clone sourceInstance gameObject|j},
          ~actual={j|do|j}
        ),
        () =>
          HasComponentGameObjectService.hasSourceInstanceComponent(uid, state.gameObjectRecord)
          |> assertFalse
      );
      test(
        Log.buildAssertMessage(
          ~expect={j|not clone objectInstance gameObject|j},
          ~actual={j|do|j}
        ),
        () =>
          HasComponentGameObjectService.hasObjectInstanceComponent(uid, state.gameObjectRecord)
          |> assertFalse
      )
    },
    StateData.stateData.isDebug
  );
  let totalClonedGameObjectArr = [||];
  (
    _clone(
      (
        uid,
        [@bs] GetComponentGameObjectService.getTransformComponent(uid, state.gameObjectRecord)
        |> Js.Option.getExn,
        ArraySystem.range(0, count - 1),
        [||],
        totalClonedGameObjectArr
      ),
      isShareMaterial,
      state
    ),
    totalClonedGameObjectArr
  )
};