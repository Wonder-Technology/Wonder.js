open StateDataMainType;

open BoxGeometryType;

open Js.Typed_array;

let getRecord = ({boxGeometryRecord}) => boxGeometryRecord;

let create = () => {
  let (vertices, normals, indices) = ComputePointsBoxGeometryService.generateAllFaces();
  {
    index: 0,
    vertices: Float32Array.make(vertices),
    normals: Float32Array.make(normals),
    indices: Uint16Array.make(indices),
    gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
    disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
    groupCountMap: WonderCommonlib.SparseMapService.createEmpty()
  }
};

let deepCopyForRestore = (state) => {
  let {index, vertices, normals, indices, groupCountMap, gameObjectMap, disposedIndexArray} =
    state |> getRecord;
  {
    ...state,
    boxGeometryRecord: {
      index,
      vertices,
      normals,
      indices,
      groupCountMap: groupCountMap |> SparseMapService.copy,
      gameObjectMap: gameObjectMap |> SparseMapService.copy,
      disposedIndexArray: disposedIndexArray |> Js.Array.copy
    }
  }
};