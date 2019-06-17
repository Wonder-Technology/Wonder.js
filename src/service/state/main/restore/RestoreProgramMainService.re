open StateDataMainType;

open AllProgramType;

let restore = (currentState, targetState) => {
  let {programMap} = currentState.programRecord;
  {
    ...targetState,
    programRecord: {
      ...targetState.programRecord,
      lastUsedProgram: None,
    },
  };
};