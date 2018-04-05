open StateDataMainType;

let getProgramRecord = (state) => state.programRecord;

let getProgram = (shaderIndex: int, state: StateDataMainType.state) =>
  ProgramService.getProgram(shaderIndex, state.programRecord);

let clearLastUsedProgram = (state: StateDataMainType.state) => {
  ...state,
  programRecord: {...state.programRecord, lastUsedProgram: None}
};