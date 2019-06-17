open StateDataRenderWorkerType;

let setMaxTextureUnit = (maxTextureUnit, state) => {
  ...state,
  gpuDetectRecord: {
    ...state.gpuDetectRecord,
    maxTextureUnit: Some(maxTextureUnit),
  },
};