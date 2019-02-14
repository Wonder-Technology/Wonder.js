open StateDataMainType;

let getProgramRecord = state => state.programRecord;

let getProgram = (shaderIndex: int, state: StateDataMainType.state) =>
  ProgramService.getProgram(shaderIndex, state.programRecord);

let unsafeGetProgram = (shaderIndex: int, state: StateDataMainType.state) =>
  ProgramService.unsafeGetProgram(shaderIndex, state.programRecord);

let clearLastUsedProgram = (state: StateDataMainType.state) => {
  ...state,
  programRecord: {
    ...state.programRecord,
    lastUsedProgram: None,
  },
};

let setLastUsedProgram = (program, state) => {
  ...state,
  programRecord: {
    ...state.programRecord,
    lastUsedProgram: Some(program),
  },
};