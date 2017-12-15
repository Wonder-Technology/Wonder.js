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
        localToWorldMatrixTypeArrayPool: [||],
        localPositionTypeArrayPool: [||],
        parentMap: parentMap |> SparseMapSystem.copy,
        childMap: childMap |> SparseMapSystem.copy,
        dirtyMap: dirtyMap |> SparseMapSystem.copy,
        gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};

let restoreFromState = (currentState, targetState) => {
  let {
    localToWorldMatrixMap,
    localPositionMap,
    localToWorldMatrixTypeArrayPool,
    localPositionTypeArrayPool
  } =
    getTransformData(currentState);
  let (localToWorldMatrixTypeArrayPool, localPositionTypeArrayPool) =
    TransformTypeArrayPoolCommon.addAllTypeArrayToPool(
      localToWorldMatrixMap,
      localPositionMap,
      localToWorldMatrixTypeArrayPool,
      localPositionTypeArrayPool
    );
  {
    ...targetState,
    transformData:
      Some({
        ...getTransformData(targetState),
        localToWorldMatrixTypeArrayPool,
        localPositionTypeArrayPool
      })
  }
};