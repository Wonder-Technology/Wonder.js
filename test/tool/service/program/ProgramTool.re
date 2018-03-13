open StateDataType;

let getProgramRecord = (state) => state.programRecord;

let getProgram = (shaderIndex: int, state: StateDataType.state) =>
  ProgramService.getProgram(shaderIndex, state.programRecord);

let clearLastUsedProgram = (state: StateDataType.state) => {
  ...state,
  programRecord: {...state.programRecord, lastUsedProgram: None}
};