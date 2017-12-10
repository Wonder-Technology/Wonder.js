open StateDataType;

let getData = GPUStateUtils.getData;

let setPrecision = (precision, state) => {
  ...state,
  gpuDetectData: {...state.gpuDetectData, precision: Some(precision)}
};