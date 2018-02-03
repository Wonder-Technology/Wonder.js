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
      |> LightCreateCommon.checkNotExceedMaxCount(DirectionLightHelper.getBufferMaxCount())
  );