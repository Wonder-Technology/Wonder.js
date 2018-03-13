open StateDataType;

let execJob = (flags, state) => {
  let glslRecord = state.glslRecord;
  glslRecord.precision = Some(PrecisionService.getPrecisionSource(state));
  state
};