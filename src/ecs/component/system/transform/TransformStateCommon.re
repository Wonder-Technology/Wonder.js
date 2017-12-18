open TransformType;

open StateDataType;

open Js.Typed_array;

let getTransformData = (state: StateDataType.state) => Js.Option.getExn(state.transformData);

let deepCopyState = (state: StateDataType.state) => {
  let {
    index,
    localToWorldMatrixMap,
    localPositionMap,
    parentMap,
    childMap,
    dirtyMap,
    gameObjectMap,
    disposedIndexArray
  } =
    state |> getTransformData;
  {
    ...state,
    transformData:
      Some({
        index,
        localToWorldMatrixMap: localToWorldMatrixMap |> CopyStateUtils.deepCopyFloat32ArrayArray,
        localPositionMap: localPositionMap |> CopyStateUtils.deepCopyFloat32ArrayArray,
        parentMap: parentMap |> SparseMapSystem.copy,
        childMap: childMap |> SparseMapSystem.copy,
        dirtyMap: dirtyMap |> SparseMapSystem.copy,
        gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};

let restore = (currentState, {float32ArrayPoolMap} as sharedData, targetState) => {
  let {localToWorldMatrixMap, localPositionMap} = getTransformData(currentState);
  let float32ArrayPoolMap =
    TransformTypeArrayPoolCommon.addAllTypeArrayToPool(
MemoryConfigSystem.getMaxTypeArrayPoolSize(targetState),
      localToWorldMatrixMap,
      localPositionMap,
      float32ArrayPoolMap
    );
  (targetState, {...sharedData, float32ArrayPoolMap})
};