open StateDataType;

open PointLightType;

let create =
  [@bs]
  (
    (state: StateDataType.state) =>
      {
        let {index, mappedIndexMap} as data = PointLightStateCommon.getLightData(state);
        (
          {
            ...state,
            pointLightData: {
              ...data,
              index: succ(index),
              mappedIndexMap: mappedIndexMap |> LightIndexCommon.setMappedIndex(index, index)
            }
          },
          index
        )
      }
      |> LightCreateCommon.checkNotExceedMaxCount(PointLightHelper.getBufferMaxCount())
  );