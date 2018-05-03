open StateDataMainType;

open CustomGeometryType;

open Js.Typed_array;

open BufferCustomGeometryService;

let getRecord = ({customGeometryRecord}) => customGeometryRecord |> OptionService.unsafeGet;

let setDefaultTypeArrData = (count: int, (vertices, normals, indices)) =>
  WonderCommonlib.ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((vertices, normals, indices), index) => (
           TypeArrayService.setFloat1(getVertexIndex(index), 0., vertices),
           TypeArrayService.setFloat1(getVertexIndex(index), 0., normals),
           TypeArrayService.setUInt16_1(getIndexIndex(index), 0, indices)
         )
       ),
       (vertices, normals, indices)
     );

let _initBufferData = (count) => {
  let buffer = createBuffer(count);
  let (vertices, normals, indices, verticesInfos, normalsInfos, indicesInfos) =
    CreateTypeArrayCustomGeometryService.createTypeArrays(buffer, count);
  (buffer, vertices, normals, indices, verticesInfos, normalsInfos, indicesInfos)
};

let create = ({settingRecord} as state) => {
  let geometryDataBufferCount =
    BufferSettingService.getCustomGeometryPointDataBufferCount(settingRecord);
  let (buffer, vertices, normals, indices, verticesInfos, normalsInfos, indicesInfos) =
    _initBufferData(geometryDataBufferCount);
  state.customGeometryRecord =
    Some({
      index: 0,
      buffer,
      vertices,
      normals,
      indices,
      verticesInfos,
      normalsInfos,
      indicesInfos,
      verticesOffset: 0,
      normalsOffset: 0,
      indicesOffset: 0,
      disposeCount: 0,
      /* configDataMap: WonderCommonlib.SparseMapService.createEmpty(),
         computeDataFuncMap: WonderCommonlib.SparseMapService.createEmpty(), */
      gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      aliveIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      /* isInitMap: WonderCommonlib.SparseMapService.createEmpty(), */
      groupCountMap: WonderCommonlib.SparseMapService.createEmpty()
    });
  state
};

let deepCopyForRestore = (state) => {
  let {
        index,
        vertices,
        normals,
        indices,
        verticesOffset,
        normalsOffset,
        indicesOffset,
        disposeCount,
        groupCountMap,
        gameObjectMap,
        disposedIndexArray,
        disposedIndexMap,
        aliveIndexArray
      } as record =
    state |> getRecord;
  {
    ...state,
    customGeometryRecord:
      Some({
        ...record,
        index,
        vertices:
          vertices |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(index * getVertexSize()),
        normals:
          normals |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(index * getVertexSize()),
        indices:
          indices |> CopyTypeArrayService.copyUint16ArrayWithEndIndex(index * getIndexSize()),
        verticesOffset,
        normalsOffset,
        indicesOffset,
        disposeCount,
        groupCountMap: groupCountMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        disposedIndexMap: disposedIndexMap |> SparseMapService.copy,
        aliveIndexArray: aliveIndexArray |> Js.Array.copy
      })
  }
};