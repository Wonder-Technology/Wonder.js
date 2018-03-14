open MainStateDataType;

open GLSLLocationType;

let restore = (intersectShaderIndexDataArray, currentState, targetState) => {
  let {attributeLocationMap, uniformLocationMap} = currentState.glslLocationRecord;
  {
    ...targetState,
    glslLocationRecord: {
      attributeLocationMap:
        RestoreShaderFromStateService.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          attributeLocationMap
        ),
      uniformLocationMap:
        RestoreShaderFromStateService.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformLocationMap
        )
    }
  }
};