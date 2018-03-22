open MainStateDataType;

open GeometryType;

open Js.Typed_array;

open TypeArrayService;

/* /* let setPointsWithArray =
      (
        (index: int, points, record, pointsMap),
        (getTypeArrFromPoolFunc, fillTypeArrayFunc, makeTypeArrayFunc),
        typeArrayPoolRecord
      ) => */
   let setPointsWithArray =
       (
         (index: int, points, record),
         (getTypeArrFromPoolFunc, fillTypeArrayFunc, makeTypeArrayFunc),
         (typeArrayPoolRecord, pointsMap)
       ) =>
     switch points {
     | None =>
       let typeArr =
         switch ([@bs] getTypeArrFromPoolFunc(record |> Js.Array.length, typeArrayPoolRecord)) {
         | None => [@bs] makeTypeArrayFunc(record)
         | Some(typeArr) => [@bs] fillTypeArrayFunc(typeArr, record, 0)
         };
       (typeArrayPoolRecord, pointsMap |> WonderCommonlib.SparseMapService.set(index, typeArr))
     | Some(indices) =>
       [@bs] fillTypeArrayFunc(indices, record, 0) |> ignore;
       (typeArrayPoolRecord, pointsMap)
     }; */
let buildInfo = (startIndex: int, endIndex: int) =>
  {startIndex, endIndex}
  |> WonderLog.Contract.ensureCheck(
       (r) => {
         open WonderLog;
         open Contract;
         open Operators;
         test(
           Log.buildAssertMessage(~expect={j|startIndex >= 0|j}, ~actual={j|is $startIndex|j}),
           () => r.startIndex >= 0
         );
         test(
           Log.buildAssertMessage(
             ~expect={j|endIndex >= startIndex|j},
             ~actual={j|is $endIndex|j}
           ),
           () => r.endIndex >= r.startIndex
         )
       },
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );

let getInfo = (infoArray, mappedIndex) =>
  Array.unsafe_get(infoArray, mappedIndex)
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|infoArray[$mappedIndex] exist|j},
                   ~actual={j|not|j}
                 ),
                 () => infoArray |> Js.Array.length >= mappedIndex + 1
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );

let getFloat32PointData = (mappedIndex: int, points: Float32Array.t, infoArray) => {
  let {startIndex, endIndex} = getInfo(infoArray, mappedIndex);
  TypeArrayService.getFloat32ArrSubarray(points, startIndex, endIndex)
};

let setFloat32PointData =
    (mappedIndex: int, infoArray: geometryInfoArray, offset: int, count, fillFloat32ArrayFunc) => {
  let startIndex = offset;
  let newOffset = offset + count;
  Array.unsafe_set(infoArray, mappedIndex, buildInfo(startIndex, newOffset));
  fillFloat32ArrayFunc(startIndex);
  newOffset
};

let getUint16PointData = (mappedIndex: int, points: Uint16Array.t, infoArray) => {
  let {startIndex, endIndex} = getInfo(infoArray, mappedIndex);
  getUint16ArrSubarray(points, startIndex, endIndex)
};

let setUint16PointData = (mappedIndex: int, infoArray, offset: int, count, fillUint16ArraryFunc) => {
  let startIndex = offset;
  let newOffset = offset + count;
  Array.unsafe_set(infoArray, mappedIndex, buildInfo(startIndex, newOffset));
  fillUint16ArraryFunc(startIndex);
  newOffset
};

let ensureCheckNotExceedGeometryPointDataBufferCount = (offset: int, state) =>
  state
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|not exceed geometryPointDataBufferCount|j},
                   ~actual={j|exceed|j}
                 ),
                 () =>
                   offset
                   <= BufferSettingService.getGeometryPointDataBufferCount(
                        state.settingRecord
                      )
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );