open StateDataType;

open ProgramType;

let restore = (intersectShaderIndexDataArray, currentState, targetState) => {
  let {programMap} = currentState.programRecord;
  {
    ...targetState,
    programRecord: {
      programMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          programMap
        ),
      lastUsedProgram: None
    }
  }
};