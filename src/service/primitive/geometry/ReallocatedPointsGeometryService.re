open GeometryType;

open Js.Typed_array;

open TypeArrayService;

let getInfo = (infoIndex, infos) =>
  (
    TypeArrayService.getUint32_1(infoIndex, infos),
    TypeArrayService.getUint32_1(infoIndex + 1, infos),
  )
  |> WonderLog.Contract.ensureCheck(
       ((startIndex, endIndex)) => {
         open WonderLog;
         open Contract;
         open Operators;

         test(
           Log.buildAssertMessage(
             ~expect={j|has info data|j},
             ~actual={j|not|j},
           ),
           () => {
             startIndex |> assertNullableExist;
             endIndex |> assertNullableExist;
           },
         );
         test(
           Log.buildAssertMessage(
             ~expect={j|endIndex >= startIndex|j},
             ~actual={j|is $endIndex|j},
           ),
           () =>
           endIndex >= startIndex
         );
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let setInfo = (infoIndex, startIndex, endIndex, infos) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(
          ~expect={j|startIndex >= 0|j},
          ~actual={j|is $startIndex|j},
        ),
        () =>
        startIndex >= 0
      );
      test(
        Log.buildAssertMessage(
          ~expect={j|endIndex >= startIndex|j},
          ~actual={j|is $endIndex|j},
        ),
        () =>
        endIndex >= startIndex
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  infos
  |> TypeArrayService.setUint32_1(infoIndex, startIndex)
  |> TypeArrayService.setUint32_1(infoIndex + 1, endIndex);
};

let hasPointData = (infoIndex, infos) =>{
  WonderLog.Log.print((infoIndex, infos)) |> ignore;

  infoIndex + 1 <= Uint32Array.length(infos) - 1;
};

let getFloat32PointData = (infoIndex, points: Float32Array.t, infos) => {
  let (startIndex, endIndex) = getInfo(infoIndex, infos);

  TypeArrayService.getFloat32ArraySubarray(points, startIndex, endIndex);
};

let _setPointData =
    ((infoIndex: int, infos, offset: int, count), fillTypeArrayFunc) => {
  let startIndex = offset;
  let newOffset = offset + count;
  setInfo(infoIndex, startIndex, newOffset, infos) |> ignore;
  fillTypeArrayFunc(startIndex);
  newOffset;
};

let setFloat32PointData = (dataTuple, fillFloat32ArrayFunc) =>
  _setPointData(dataTuple, fillFloat32ArrayFunc);

let getUint16PointData = (infoIndex: int, points: Uint16Array.t, infos) => {
  let (startIndex, endIndex) = getInfo(infoIndex, infos);
  getUint16ArraySubarray(points, startIndex, endIndex);
};

let setUint16PointData = (dataTuple, fillUint16ArraryFunc) =>
  _setPointData(dataTuple, fillUint16ArraryFunc);

let getUint32PointData = (infoIndex: int, points: Uint32Array.t, infos) => {
  let (startIndex, endIndex) = getInfo(infoIndex, infos);
  getUint32ArraySubarray(points, startIndex, endIndex);
};

let setUint32PointData = (dataTuple, fillUint32ArraryFunc) =>
  _setPointData(dataTuple, fillUint32ArraryFunc);