open StateDataType;

open AmbientLightType;

let create =
  [@bs]
  (
    (state: StateDataType.state) =>
      {
        let {index} as data = AmbientLightStateCommon.getLightData(state);
        ({...state, ambientLightData: {...data, index: succ(index)}}, index)
      }
      /* TODO test */
      |> WonderLog.Contract.ensureCheck(
           ((state, index)) => {
             open WonderLog;
             open Contract;
             open Operators;
             let maxIndex = AmbientLightHelper.getBufferMaxCount() - 1;
             test(
               Log.buildAssertMessage(~expect={j|index <= $maxIndex|j}, ~actual={j|is $index|j}),
               () => index |> assertLte(Int, maxIndex)
             )
           },
           StateData.stateData.isDebug
         )
  );