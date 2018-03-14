open StateDataType;

let execJob = (flags, state) => {
  let glslRecord = state.glslRecord;
  glslRecord.precision = Some(PrecisionMainService.getPrecisionSource(state));
  state
};