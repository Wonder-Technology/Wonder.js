open MainStateDataType;

let execJob = (flags, state) => {
  let glslRecord = state.glslRecord;
  glslRecord.precision = Some(PrecisionAllService.getPrecisionSource(state));
  state
};