open StateDataType;

let getData = GPUStateUtils.getGpuDetectData;

let setPrecision = (precision, state) => {
  ...state,
  gpuDetectData: {...state.gpuDetectData, precision: Some(precision)}
};