let getProgram = (shaderIndex: int, state: StateDataType.state) =>
  ProgramSystem.getProgram(shaderIndex, state);

let clearLastUsedProgram = (state: StateDataType.state) => {
  state.programData.lastUsedProgram = None;
  state
};