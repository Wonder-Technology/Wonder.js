open StateDataMainType;

open GeometryType;

open ReallocatedPointsGeometryService;

open RecordGeometryMainService;

open TypeArrayService;

open Js.Typed_array;

let getIndicesType = (index, state) => {
  let {indicesTypeMap} as record = getRecord(state);

  IndicesTypeAllGeometryService.getIndicesType(index, indicesTypeMap);
};

let unsafeGetIndicesType = (index, state) => {
  let {indicesTypeMap} as record = getRecord(state);

  IndicesTypeAllGeometryService.unsafeGetIndicesType(index, indicesTypeMap);
};

let setIndicesType = (index, indicesType, state) => {
  let {indicesTypeMap} as record = getRecord(state);

  record.indicesTypeMap =
    IndicesTypeAllGeometryService.setIndicesType(
      index,
      indicesType,
      indicesTypeMap,
    );

  state;
};

let getIndices16 =
  (. index: int, state) => {
    let {indices16, indices32, indicesInfos} = getRecord(state);

    getUint16PointData(
      BufferGeometryService.getInfoIndex(index),
      indices16,
      indicesInfos,
    );
  };

let setIndicesByUint16Array = (index: int, data: Uint16Array.t, state) => {
  let state = setIndicesType(index, Short, state);

  let {indicesInfos, indices16, indices16Offset, indicesTypeMap} as record =
    getRecord(state);

  record.indices16Offset =
    setUint16PointData(
      (
        BufferGeometryService.getInfoIndex(index),
        indicesInfos,
        indices16Offset,
        Uint16Array.length(data),
      ),
      fillUint16ArrayWithOffset(indices16, data),
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

  let {indicesInfos, indices32, indices32Offset} as record =
    getRecord(state);

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

let hasIndices = (index, state) => {
  let {indicesInfos} = getRecord(state);

  ReallocatedPointsGeometryService.hasPointData(
    BufferGeometryService.getInfoIndex(index),
    indicesInfos,
  );
};

let hasIndices16 = (geometry, state) =>
  switch (unsafeGetIndicesType(geometry, state)) {
  | Short => true
  | _ => false
  };

let hasIndices32 = (geometry, state) =>
  switch (unsafeGetIndicesType(geometry, state)) {
  | Int => true
  | _ => false
  };