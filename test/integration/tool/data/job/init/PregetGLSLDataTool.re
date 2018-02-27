open StateDataType;

let preparePrecision = (state) => {
  ...state,
  gpuDetectData: {...state.gpuDetectData, precision: Some(GPUDetectType.HIGHP)}
};