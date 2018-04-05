open StateDataMainType;

let execJob = (flags, state) => {
  let glslRecord = state.glslRecord;
  glslRecord.precision = Some(PrecisionInitMaterialService.getPrecisionSource(state));
  state
};