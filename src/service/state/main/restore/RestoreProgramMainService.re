open StateDataType;

open ProgramType;

let restore = (intersectShaderIndexDataArray, currentState, targetState) => {
  let {programMap} = currentState.programRecord;
  {
    ...targetState,
    programRecord: {
      programMap:
        RestoreShaderFromStateService.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          programMap
        ),
      lastUsedProgram: None
    }
  }
};