open GeometryType;

open Js.Typed_array;

open TypeArrayService;

let getInfo = (infoIndex, infos) =>
  (TypeArrayService.getUInt8_1(infoIndex, infos), TypeArrayService.getUInt8_1(infoIndex + 1, infos))
  |> WonderLog.Contract.ensureCheck(
       ((startIndex, endIndex)) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|endIndex >= startIndex|j},
                   ~actual={j|is $endIndex|j}
                 ),
                 () => endIndex >= startIndex
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let setInfo = (infoIndex, startIndex, endIndex, infos) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(~expect={j|startIndex >= 0|j}, ~actual={j|is $startIndex|j}),
        () => startIndex >= 0
      );
      test(
        Log.buildAssertMessage(~expect={j|endIndex >= startIndex|j}, ~actual={j|is $endIndex|j}),
        () => endIndex >= startIndex
      )
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  infos
  |> TypeArrayService.setUInt8_1(infoIndex, startIndex)
  |> TypeArrayService.setUInt8_1(infoIndex + 1, endIndex)
};

let getFloat32PointData = (infoIndex, points: Float32Array.t, infos) => {
  let (startIndex, endIndex) = getInfo(infoIndex, infos);
  TypeArrayService.getFloat32ArraySubarray(points, startIndex, endIndex)
};

let setFloat32PointData = (infoIndex: int, infos, offset: int, count, fillFloat32ArrayFunc) => {
  let startIndex = offset;
  let newOffset = offset + count;
  setInfo(infoIndex, startIndex, newOffset, infos) |> ignore;
  fillFloat32ArrayFunc(startIndex);
  newOffset
};

let getUint16PointData = (infoIndex: int, points: Uint16Array.t, infos) => {
  let ( startIndex, endIndex ) = getInfo(infoIndex, infos);
  getUint16ArraySubarray(points, startIndex, endIndex)
};

let setUint16PointData = (infoIndex: int, infos, offset: int, count, fillUint16ArraryFunc) => {
  let startIndex = offset;
  let newOffset = offset + count;
  setInfo(infoIndex, startIndex, newOffset, infos) |> ignore;
  fillUint16ArraryFunc(startIndex);
  newOffset
};