let buildBufferArray = (buffers: array(int), binBuffer) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;

      let bufferLen = buffers |> Js.Array.length;
      test(
        Log.buildAssertMessage(
          ~expect={j|has only one buffer|j},
          ~actual={j|has $bufferLen|j},
        ),
        () =>
        bufferLen == 1
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  [|binBuffer|];
};