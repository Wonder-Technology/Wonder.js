open StateDataMainType;

let execJob = (flags, state) => {
  let glslRecord = state.glslRecord;
  glslRecord.precision =
    Some(PrecisionAllService.getPrecisionSource(state.gpuDetectRecord, state.glslChunkRecord));
  state
};