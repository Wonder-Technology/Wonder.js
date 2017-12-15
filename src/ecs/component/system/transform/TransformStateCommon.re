open TransformType;

open StateDataType;

open Js.Typed_array;

let getTransformData = (state: StateDataType.state) => Js.Option.getExn(state.transformData);

let deepCopyState = ({transformData} as state) => {
  let {
    index,
    localToWorldMatrixMap,
    localPositionMap,
    localToWorldMatrixTypeArrayPool,
    localPositionTypeArrayPool,
    parentMap,
    childMap,
    dirtyMap,
    gameObjectMap,
    disposedIndexArray
  } =
    transformData |> Js.Option.getExn;
  {
    ...state,
    transformData:
      Some({
        index,
        localToWorldMatrixMap: localToWorldMatrixMap |> CopyStateUtils.deepCopyFloat32ArrayArray,
        localPositionMap: localPositionMap |> CopyStateUtils.deepCopyFloat32ArrayArray,
        localToWorldMatrixTypeArrayPool,
        localPositionTypeArrayPool,
        parentMap: parentMap |> SparseMapSystem.copy,
        childMap: childMap |> SparseMapSystem.copy,
        dirtyMap: dirtyMap |> SparseMapSystem.copy,
        gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};