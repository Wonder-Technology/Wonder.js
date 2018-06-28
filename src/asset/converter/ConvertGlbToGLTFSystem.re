open Js.Typed_array;

let _checkGlb = dataView => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(
          ~expect={j|Source file to be a GLB (glTF Binary) model|j},
          ~actual={j|not|j},
        ),
        () => {
          let (value, _) = DataViewCommon.getUint32_1(. 0, dataView);

          value == 0x46546C67;
        },
      );

      let (readVersion, _) = DataViewCommon.getUint32_1(. 4, dataView);

      test(
        Log.buildAssertMessage(
          ~expect={j|Only GLB version 2 is supported|j},
          ~actual={j|Detected version: $readVersion|j},
        ),
        () =>
        readVersion == 2
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  dataView;
};

let convert = (glb: ArrayBuffer.t) => {
  let dataView = DataViewCommon.create(glb);
  let dataView = _checkGlb(dataView);
  let (jsonBufSize, _) = DataViewCommon.getUint32_1(. 12, dataView);
  let decoder = TextDecoder.newTextDecoder("utf-8");

  (
    decoder
    |> TextDecoder.decodeUint8Array(
         Uint8Array.fromBufferRange(glb, ~offset=20, ~length=jsonBufSize),
       ),
    glb |> ArrayBuffer.sliceFrom(jsonBufSize + 28),
  );
};