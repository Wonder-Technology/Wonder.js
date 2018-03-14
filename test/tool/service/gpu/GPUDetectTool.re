open MainStateDataType;

let getData = (state) => state.gpuDetectRecord;

let setPrecision = (precision, state) => {
  ...state,
  gpuDetectRecord: {...state.gpuDetectRecord, precision: Some(precision)}
};