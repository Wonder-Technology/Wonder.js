open StateDataMainType;

let getRecord = state => state.gpuDetectRecord;

let setPrecision = (precision, state) => {
  ...state,
  gpuDetectRecord: {
    ...state.gpuDetectRecord,
    precision: Some(precision),
  },
};

let setMaxTextureUnit = (maxTextureUnit, state) => {
  ...state,
  gpuDetectRecord: {
    ...state.gpuDetectRecord,
    maxTextureUnit: Some(maxTextureUnit),
  },
};