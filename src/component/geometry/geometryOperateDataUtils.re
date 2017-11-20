open Contract;

open GeometryStateUtils;

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

let getInfo = (infoArray, index) =>
  Array.unsafe_get(infoArray, index)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             {j|infoArray[$index] should exist|j},
             () => infoArray |> Js.Array.length >= index + 1
           )
         )
     );

/* switch infoArray[index] {
   | None => ExceptionHandleSystem.throwMessage({j|infoArray[$index] should exist|j})
   | Some({startIndex, endIndex}) => getFloat32ArrSubarray(points, startIndex, endIndex)
   }; */
let _getFloat32PointData = (index: int, points: Float32Array.t, infoArray) => {
  /* switch infoArray[index] {
     | None => ExceptionHandleSystem.throwMessage({j|infoArray[$index] should exist|j})
     | Some({startIndex, endIndex}) => getFloat32ArrSubarray(points, startIndex, endIndex)
     }; */
  let {startIndex, endIndex} = getInfo(infoArray, index);
  /* switch infoArray[index] {
     | None => ExceptionHandleSystem.throwMessage({j|infoArray[$index] should exist|j})
     | Some({startIndex, endIndex}) => getFloat32ArrSubarray(points, startIndex, endIndex)
     }; */
  getFloat32ArrSubarray(points, startIndex, endIndex)
};

let _setFloat32PointData =
    (
      index: int,
      data: Js.Array.t(float),
      points: Float32Array.t,
      infoArray: geometryInfoArray,
      offset: int
    ) => {
  let count = Js.Array.length(data);
  let startIndex = offset;
  let newOffset = offset + count;
  /* Array.unsafe_set(infoArray, index, Some(buildInfo(startIndex, newOffset))); */
  Array.unsafe_set(infoArray, index, buildInfo(startIndex, newOffset));
  fillFloat32Arr(points, data, startIndex);
  newOffset
};

let _getUint16PointData = (index: int, points: Uint16Array.t, infoArray) => {
  requireCheck(
    () =>
      Contract.Operators.(test("info should exist", () => index <= Js.Array.length(infoArray) - 1))
  );
  /* switch infoArray[index] {
     | None => ExceptionHandleSystem.throwMessage({j|infoArray[$index] should exist|j})
     | Some({startIndex, endIndex}) => getUint16ArrSubarray(points, startIndex, endIndex)
     } */
  let {startIndex, endIndex} = getInfo(infoArray, index);
  getUint16ArrSubarray(points, startIndex, endIndex)
};

let _setUint16PointData =
    (index: int, data: Js.Array.t(int), points: Uint16Array.t, infoArray, offset: int) => {
  let count = Js.Array.length(data);
  let startIndex = offset;
  let newOffset = offset + count;
  /* Array.unsafe_set(infoArray, index, Some(buildInfo(startIndex, newOffset))); */
  Array.unsafe_set(infoArray, index, buildInfo(startIndex, newOffset));
  fillUint16Arr(points, data, startIndex);
  newOffset
};

let getVertices = (index: int, state: StateDataType.state) => {
  let {vertices, verticesInfoArray} = getGeometryData(state);
  _getFloat32PointData(index, vertices, verticesInfoArray)
};

let setVertices = (index: int, data: Js.Array.t(float), state: StateDataType.state) => {
  let {verticesInfoArray, vertices, verticesOffset} as geometryData = getGeometryData(state);
  geometryData.verticesOffset =
    _setFloat32PointData(index, data, vertices, verticesInfoArray, verticesOffset);
  state |> _ensureCheckNotExceedGeometryPointDataBufferCount(getGeometryData(state).verticesOffset)
};

let getIndices = (index: int, state: StateDataType.state) => {
  let {indices, indicesInfoArray} = getGeometryData(state);
  _getUint16PointData(index, indices, indicesInfoArray)
};

let setIndices = (index: int, data: Js.Array.t(int), state: StateDataType.state) => {
  let {indicesInfoArray, indices, indicesOffset} as geometryData = getGeometryData(state);
  geometryData.indicesOffset =
    _setUint16PointData(index, data, indices, indicesInfoArray, indicesOffset);
  state |> _ensureCheckNotExceedGeometryPointDataBufferCount(getGeometryData(state).indicesOffset)
};