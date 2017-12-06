open StateDataType;

let getData = GPUStateSystem.getData;

let setPrecision = (precision, state) => {
  ...state,
  gpuDetectData: {...state.gpuDetectData, precision: Some(precision)}
};