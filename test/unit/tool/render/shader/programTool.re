let getProgram = (shaderIndexStr: string, state: StateDataType.state) =>
  ProgramSystem.getProgram(shaderIndexStr, state);

let clearLastUsedProgram = (state: StateDataType.state) => {
  state.programData.lastUsedProgram = None;
  state
};