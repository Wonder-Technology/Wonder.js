open GameObjectType;

let _createGameObjectArr = (countRangeArr, state) =>
  countRangeArr
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         ((state, clonedGameObjectArr), _) => {
           let (state, gameObject) = GameObjectCreateCommon.create(state);
           (state, clonedGameObjectArr |> ArraySystem.push(gameObject))
         }
       ),
       (state, [||])
     );

let _setParent = (clonedParentTransformArr, clonedTransformArr, state) =>
  clonedParentTransformArr
  |> WonderCommonlib.ArraySystem.reduceOneParami(
       [@bs]
       (
         (transformData, clonedParentTransform, i) =>
           transformData
           |> TransformSystem.setParentNotMarkDirty(
                Some(clonedParentTransform),
                clonedTransformArr[i]
              )
       ),
       TransformSystem.getTransformData(state)
     );

let rec _clone =
        (
          (uid: int, transform, countRangeArr, clonedParentTransformArr, totalClonedGameObjectArr),
          isShareMaterial,
          state: StateDataType.state
        ) => {
  let (state, clonedGameObjectArr) = _createGameObjectArr(countRangeArr, state);
  let totalClonedGameObjectArr = totalClonedGameObjectArr |> ArraySystem.push(clonedGameObjectArr);
  let (state, clonedTransformArr) =
    GameObjectCloneComponentCommon.cloneComponent(
      (uid, transform, countRangeArr, clonedGameObjectArr),
      isShareMaterial,
      state
    );
  state
  |> _setParent(clonedParentTransformArr, clonedTransformArr)
  |> TransformSystem.unsafeGetChildren(transform)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, childTransform) =>
           state
           |> _clone(
                (
                  state |> TransformSystem.getGameObject(childTransform) |> Js.Option.getExn,
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
        () => GameObjectHasComponentCommon.hasSourceInstanceComponent(uid, state) |> assertFalse
      );
      test(
        Log.buildAssertMessage(
          ~expect={j|not clone objectInstance gameObject|j},
          ~actual={j|do|j}
        ),
        () => GameObjectHasComponentCommon.hasObjectInstanceComponent(uid, state) |> assertFalse
      )
    },
    StateData.stateData.isTest
  );
  let totalClonedGameObjectArr = [||];
  (
    _clone(
      (
        uid,
        [@bs] GameObjectGetComponentCommon.getTransformComponent(uid, state) |> Js.Option.getExn,
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