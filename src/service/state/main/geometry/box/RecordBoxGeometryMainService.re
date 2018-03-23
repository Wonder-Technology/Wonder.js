open MainStateDataType;

open BoxGeometryType;

open Js.Typed_array;

let getRecord = ({boxGeometryRecord}) => boxGeometryRecord |> OptionService.unsafeGet;

let getVertexSize = () => 3;

let getVertexLength = (count) => count * getVertexSize();

let getVerticesOffset = (count) => 0;

let getNormalsOffset = (count) =>
  getVerticesOffset(count) + getVertexLength(count) * Float32Array._BYTES_PER_ELEMENT;

let getIndexSize = () => 1;

let getIndicesLength = (count) => count * getIndexSize();

let getIndicesOffset = (count) =>
  getNormalsOffset(count) + getVertexLength(count) * Float32Array._BYTES_PER_ELEMENT;

let getVerticesCount = () => 72;

let getNormalsCount = () => 72;

let getIndicesCount = () => 36;

let getVertexIndex = (index) => index * getVertexSize() * getVerticesCount();

let getNormalIndex = (index) => index * getVertexSize() * getNormalsCount();

let getIndexIndex = (index) => index * getIndexSize() * getIndicesCount();

let getVerticesTypeArray = (index: int, points: Float32Array.t) =>
  TypeArrayService.getFloat32ArrSubarray(
    points,
    getVertexIndex(index),
    getVertexIndex(index) + getVerticesCount()
  );

let setVertices = (index: int, points: array(float), typeArr) =>
  TypeArrayService.fillFloat32Array(typeArr, points, getVertexIndex(index));

let setVerticesByTypeArray = (index: int, points: Float32Array.t, typeArr) =>
  TypeArrayService.fillFloat32ArrayWithOffset(typeArr, points, getVertexIndex(index));

let getNormalsTypeArray = (index: int, points: Float32Array.t) =>
  TypeArrayService.getFloat32ArrSubarray(
    points,
    getNormalIndex(index),
    getNormalIndex(index) + getNormalsCount()
  );

let setNormals = (index: int, points: array(float), typeArr) =>
  TypeArrayService.fillFloat32Array(typeArr, points, getNormalIndex(index));

let setNormalsByTypeArray = (index: int, points: Float32Array.t, typeArr) =>
  TypeArrayService.fillFloat32ArrayWithOffset(typeArr, points, getNormalIndex(index));

let getIndicesTypeArray = (index: int, points: Uint16Array.t) =>
  TypeArrayService.getUint16ArrSubarray(
    points,
    getIndexIndex(index),
    getIndexIndex(index) + getIndicesCount()
  );

let setIndices = (index: int, points: array(int), typeArr) =>
  TypeArrayService.fillUint16Array(typeArr, points, getIndexIndex(index));

let setIndicesByTypeArray = (index: int, points: Uint16Array.t, typeArr) =>
  TypeArrayService.fillUint16ArrWithOffset(typeArr, points, getIndexIndex(index));

let _initBufferData = (count) => {
  let buffer =
    ArrayBuffer.make(
      count
      * (
        Float32Array._BYTES_PER_ELEMENT
        * getVertexSize()
        * 2
        + Uint16Array._BYTES_PER_ELEMENT
        * getIndexSize()
      )
    );
  let vertices =
    Float32Array.fromBufferRange(
      buffer,
      ~offset=getVerticesOffset(count),
      ~length=getVertexLength(count)
    );
  let normals =
    Float32Array.fromBufferRange(
      buffer,
      ~offset=getNormalsOffset(count),
      ~length=getVertexLength(count)
    );
  let indices =
    Uint16Array.fromBufferRange(
      buffer,
      ~offset=getIndicesOffset(count),
      ~length=getIndicesLength(count)
    );
  (buffer, vertices, normals, indices)
};

let create = ({settingRecord} as state) => {
  let geometryDataBufferCount =
    BufferSettingService.getBoxGeometryPointDataBufferCount(settingRecord);
  let (buffer, vertices, normals, indices) = _initBufferData(geometryDataBufferCount);
  state.boxGeometryRecord =
    Some({
      index: 0,
      buffer,
      vertices,
      normals,
      indices,
      configDataMap: WonderCommonlib.SparseMapService.createEmpty(),
      computeDataFuncMap: WonderCommonlib.SparseMapService.createEmpty(),
      gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      isInitMap: WonderCommonlib.SparseMapService.createEmpty(),
      groupCountMap: WonderCommonlib.SparseMapService.createEmpty()
    });
  state
};

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
    index,
    buffer,
    vertices,
    normals,
    indices,
    configDataMap,
    isInitMap,
    computeDataFuncMap,
    groupCountMap,
    gameObjectMap,
    disposedIndexArray
  } =
    state |> getRecord;
  let copiedBuffer = CopyTypeArrayService.copyArrayBuffer(buffer);
  let geometryDataBufferCount =
    BufferSettingService.getBoxGeometryPointDataBufferCount(settingRecord);
  {
    ...state,
    boxGeometryRecord:
      Some({
        index,
        buffer: copiedBuffer,
        vertices:
          CopyTypeArrayService.copyFloat32TypeArrayFromBufferRange(
            copiedBuffer,
            getVerticesOffset(geometryDataBufferCount),
            getVertexLength(geometryDataBufferCount)
          ),
        normals:
          CopyTypeArrayService.copyFloat32TypeArrayFromBufferRange(
            copiedBuffer,
            getNormalsOffset(geometryDataBufferCount),
            getVertexLength(geometryDataBufferCount)
          ),
        indices:
          CopyTypeArrayService.copyUint16TypeArrayFromBufferRange(
            copiedBuffer,
            getIndicesOffset(geometryDataBufferCount),
            getIndicesLength(geometryDataBufferCount)
          ),
        computeDataFuncMap: computeDataFuncMap |> SparseMapService.copy,
        configDataMap: configDataMap |> SparseMapService.copy,
        isInitMap: isInitMap |> SparseMapService.copy,
        groupCountMap: groupCountMap |> SparseMapService.copy,
        gameObjectMap: gameObjectMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};