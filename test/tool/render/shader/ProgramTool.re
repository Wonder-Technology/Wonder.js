let getProgramData = ProgramSystem._getProgramData;

let getProgram = (shaderIndex: int, state: StateDataType.state) =>
  ProgramSystem.getProgram(shaderIndex, state);

let clearLastUsedProgram = (state: StateDataType.state) => {
  ...state,
  programData: {...state.programData, lastUsedProgram: None}
};