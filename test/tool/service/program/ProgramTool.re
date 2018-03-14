open MainStateDataType;

let getProgramRecord = (state) => state.programRecord;

let getProgram = (shaderIndex: int, state: MainStateDataType.state) =>
  ProgramService.getProgram(shaderIndex, state.programRecord);

let clearLastUsedProgram = (state: MainStateDataType.state) => {
  ...state,
  programRecord: {...state.programRecord, lastUsedProgram: None}
};