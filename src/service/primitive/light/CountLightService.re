let checkNotExceedMaxCount = (count, maxCount) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let maxCount = BufferDirectionLightService.getBufferMaxCount();
      test(
        Log.buildAssertMessage(
          ~expect={j|light count: $count <= max count: $maxCount|j},
          ~actual={j|not|j},
        ),
        () =>
        assertLte(Int, count, maxCount)
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  count;
};

let getLightCount = renderLightArr => renderLightArr |> Js.Array.length;