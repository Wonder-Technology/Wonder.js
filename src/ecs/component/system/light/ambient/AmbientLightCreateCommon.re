open StateDataType;

open AmbientLightType;

let create =
  [@bs]
  (
    (state: StateDataType.state) =>
      {
        let {index, mappedIndexMap} as data = AmbientLightStateCommon.getLightData(state);
        (
          {
            ...state,
            ambientLightData: {
              ...data,
              index: succ(index),
              mappedIndexMap:
                mappedIndexMap |> AmbientLightIndexCommon.setMappedIndex(index, index)
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
             let maxIndex = AmbientLightHelper.getBufferMaxCount() - 1;
             test(
               Log.buildAssertMessage(~expect={j|<= $maxIndex|j}, ~actual={j|is $index|j}),
               () => assertLte(Int, index, maxIndex)
             )
           },
           StateData.stateData.isDebug
         )
  );