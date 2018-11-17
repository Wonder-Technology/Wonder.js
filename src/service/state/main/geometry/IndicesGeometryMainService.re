open StateDataMainType;

open GeometryType;

open ReallocatedPointsGeometryService;

open RecordGeometryMainService;

open TypeArrayService;

open Js.Typed_array;

let getIndicesType = (index, state) => {
  let {indicesTypeMap} as record = getRecord(state);

  IndicesTypeGeometryType.getIndicesType(index, indicesTypeMap);
};

let unsafeGetIndicesType = (index, state) =>
  getIndicesType(index, state) |> OptionService.unsafeGet;

let setIndicesType = (index, indicesType, state) => {
  let {indicesTypeMap} as record = getRecord(state);

  record.indicesTypeMap =
    IndicesTypeGeometryType.setIndicesType(
      index,
      indicesType,
      indicesTypeMap,
    );

  state;
};

let getIndices =
  (. index: int, state) => {
    let {indices, indices32, indicesInfos} = getRecord(state);

    getUint16PointData(
      BufferGeometryService.getInfoIndex(index),
      indices,
      indicesInfos,
    );
  };

let setIndicesByUint16Array = (index: int, data: Uint16Array.t, state) => {
  let state = setIndicesType(index, Short, state);

  let {indicesInfos, indices, indicesOffset, indicesTypeMap} as record =
    getRecord(state);

  record.indicesOffset =
    setUint16PointData(
      (
        BufferGeometryService.getInfoIndex(index),
        indicesInfos,
        indicesOffset,
        Uint16Array.length(data),
      ),
      fillUint16ArrayWithOffset(indices, data),
    );
  state;
};

let getIndices32 =
  (. index: int, state) => {
    let {indices32, indicesInfos} = getRecord(state);

    getUint32PointData(
      BufferGeometryService.getInfoIndex(index),
      indices32,
      indicesInfos,
    );
  };

let setIndicesByUint32Array = (index: int, data: Uint32Array.t, state) => {
  let state = setIndicesType(index, Int, state);

  let {indicesInfos, indices32, indices32Offset} as record = getRecord(state);

  record.indices32Offset =
    setUint32PointData(
      (
        BufferGeometryService.getInfoIndex(index),
        indicesInfos,
        indices32Offset,
        Uint32Array.length(data),
      ),
      fillUint32ArrayWithOffset(indices32, data),
    );
  state;
};