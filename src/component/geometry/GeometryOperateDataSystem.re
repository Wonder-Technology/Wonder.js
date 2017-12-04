open Contract;

open GeometryStateSystem;

open Js.Typed_array;

open TypeArrayUtils;

open GeometryType;

open StateDataType;

let _ensureCheckNotExceedGeometryPointDataBufferCount = (offset: int, state: StateDataType.state) =>
  state
  |> ensureCheck(
       (state) =>
         Contract.Operators.(
           test(
             "should not exceed geometryPointDataBufferCount",
             () => offset <= BufferConfigSystem.getConfig(state).geometryPointDataBufferCount
           )
         )
     );

let buildInfo = (startIndex: int, endIndex: int) =>
  {startIndex, endIndex}
  |> ensureCheck(
       (r) => {
         open Contract.Operators;
         test("startIndex should >= 0", () => r.startIndex >= 0);
         test("endIndex should >= startIndex", () => r.endIndex >= r.startIndex)
       }
     );

let getInfo = (infoArray, mappedIndex) =>
  Array.unsafe_get(infoArray, mappedIndex)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             {j|infoArray[$mappedIndex] should exist|j},
             () => infoArray |> Js.Array.length >= mappedIndex + 1
           )
         )
     );

/* switch infoArray[mappedIndex] {
   | None => ExceptionHandleSystem.throwMessage({j|infoArray[$mappedIndex] should exist|j})
   | Some({startIndex, endIndex}) => getFloat32ArrSubarray(points, startIndex, endIndex)
   }; */
let _getFloat32PointData = (mappedIndex: int, points: Float32Array.t, infoArray) => {
  /* switch infoArray[mappedIndex] {
     | None => ExceptionHandleSystem.throwMessage({j|infoArray[$mappedIndex] should exist|j})
     | Some({startIndex, endIndex}) => getFloat32ArrSubarray(points, startIndex, endIndex)
     }; */
  let {startIndex, endIndex} = getInfo(infoArray, mappedIndex);
  /* switch infoArray[mappedIndex] {
     | None => ExceptionHandleSystem.throwMessage({j|infoArray[$mappedIndex] should exist|j})
     | Some({startIndex, endIndex}) => getFloat32ArrSubarray(points, startIndex, endIndex)
     }; */
  getFloat32ArrSubarray(points, startIndex, endIndex)
};

let _setFloat32PointData =
    (mappedIndex: int, infoArray: geometryInfoArray, offset: int, count, fillFloat32ArrayFunc) => {
  let startIndex = offset;
  let newOffset = offset + count;
  Array.unsafe_set(infoArray, mappedIndex, buildInfo(startIndex, newOffset));
  fillFloat32ArrayFunc(startIndex);
  newOffset
};

let _getUint16PointData = (mappedIndex: int, points: Uint16Array.t, infoArray) => {
  requireCheck(
    () =>
      Contract.Operators.(test("info should exist", () => mappedIndex <= Js.Array.length(infoArray) - 1))
  );
  /* switch infoArray[mappedIndex] {
     | None => ExceptionHandleSystem.throwMessage({j|infoArray[$mappedIndex] should exist|j})
     | Some({startIndex, endIndex}) => getUint16ArrSubarray(points, startIndex, endIndex)
     } */
  let {startIndex, endIndex} = getInfo(infoArray, mappedIndex);
  getUint16ArrSubarray(points, startIndex, endIndex)
};

let _setUint16PointData = (mappedIndex: int, infoArray, offset: int, count, fillUint16ArraryFunc) => {
  let startIndex = offset;
  let newOffset = offset + count;
  Array.unsafe_set(infoArray, mappedIndex, buildInfo(startIndex, newOffset));
  fillUint16ArraryFunc(startIndex);
  newOffset
};

let getVertices = (mappedIndex: int, state: StateDataType.state) => {
  let {vertices, verticesInfoArray} = getGeometryData(state);
  _getFloat32PointData(mappedIndex, vertices, verticesInfoArray)
};

let setVertices = (mappedIndex: int, data: array(float), state: StateDataType.state) => {
  let {verticesInfoArray, vertices, verticesOffset} as geometryData = getGeometryData(state);
  geometryData.verticesOffset =
    _setFloat32PointData(
      mappedIndex,
      verticesInfoArray,
      verticesOffset,
      Js.Array.length(data),
      fillFloat32Array(vertices, data)
    );
  state |> _ensureCheckNotExceedGeometryPointDataBufferCount(getGeometryData(state).verticesOffset)
};

let setVerticesWithTypeArray = (mappedIndex: int, data: Float32Array.t, state: StateDataType.state) => {
  let {verticesInfoArray, vertices, verticesOffset} as geometryData = getGeometryData(state);
  geometryData.verticesOffset =
    _setFloat32PointData(
      mappedIndex,
      verticesInfoArray,
      verticesOffset,
      Float32Array.length(data),
      fillFloat32ArrayWithOffset(vertices, data)
    );
  state |> _ensureCheckNotExceedGeometryPointDataBufferCount(getGeometryData(state).verticesOffset)
};

let getIndices = (mappedIndex: int, state: StateDataType.state) => {
  let {indices, indicesInfoArray} = getGeometryData(state);
  _getUint16PointData(mappedIndex, indices, indicesInfoArray)
};

let setIndices = (mappedIndex: int, data: array(int), state: StateDataType.state) => {
  let {indicesInfoArray, indices, indicesOffset} as geometryData = getGeometryData(state);
  geometryData.indicesOffset =
    _setUint16PointData(
      mappedIndex,
      indicesInfoArray,
      indicesOffset,
      Js.Array.length(data),
      fillUint16Array(indices, data)
    );
  state |> _ensureCheckNotExceedGeometryPointDataBufferCount(getGeometryData(state).indicesOffset)
};

let setIndicesWithTypeArray = (mappedIndex: int, data: Uint16Array.t, state: StateDataType.state) => {
  let {indicesInfoArray, indices, indicesOffset} as geometryData = getGeometryData(state);
  geometryData.indicesOffset =
    _setUint16PointData(
      mappedIndex,
      indicesInfoArray,
      indicesOffset,
      Uint16Array.length(data),
      fillUint16ArrWithOffset(indices, data)
    );
  state |> _ensureCheckNotExceedGeometryPointDataBufferCount(getGeometryData(state).indicesOffset)
};