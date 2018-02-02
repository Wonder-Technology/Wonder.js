/* TODO duplicate */
open StateDataType;

open DirectionLightType;

let create =
  [@bs]
  (
    (state: StateDataType.state) =>
      {
        let {index, mappedIndexMap} as data = DirectionLightStateCommon.getLightData(state);
        (
          {
            ...state,
            directionLightData: {
              ...data,
              index: succ(index),
              mappedIndexMap: mappedIndexMap |> LightIndexCommon.setMappedIndex(index, index)
            }
          },
          index
        )
      }
      |> WonderLog.Contract.ensureCheck(
           ((state, index)) => {
             open WonderLog;
             open Contract;
             open Operators;
             let maxIndex = DirectionLightHelper.getBufferMaxCount() - 1;
             test(
               Log.buildAssertMessage(~expect={j|<= $maxIndex|j}, ~actual={j|is $index|j}),
               () => assertLte(Int, index, maxIndex)
             )
           },
           StateData.stateData.isDebug
         )
  );