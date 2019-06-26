open StateDataMainType;

open AllShaderType;

let restore = (currentState, targetState) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let currentPrecision = currentState.glslRecord.precision;
      let targetPrecision = targetState.glslRecord.precision;
      test(
        Log.buildAssertMessage(
          ~expect=
            {j|currentState->glslRecord->precision and targetState->glslRecord->precision be the same|j},
          ~actual={j|not|j},
        ),
        () =>
        switch (currentPrecision, targetPrecision) {
        | (Some(currentPrecision), Some(targetPrecision)) =>
          currentPrecision ==^ targetPrecision
        | (Some(_), None)
        | (None, Some(_)) => assertFail()
        | _ => assertPass()
        }
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  let {index: currentIndex} = currentState.shaderRecord;
  let {index: targetIndex} as targetShaderData = targetState.shaderRecord;

  {
    ...targetState,
    shaderRecord: {
      ...targetShaderData,
      index: Js.Math.max_int(currentIndex, targetIndex),
    },
  };
};