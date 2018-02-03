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
              mappedIndexMap: mappedIndexMap |> LightIndexCommon.setMappedIndex(index, index)
            }
          },
          index
        )
      }
      |> LightCreateCommon.checkNotExceedMaxCount(AmbientLightHelper.getBufferMaxCount())
  );