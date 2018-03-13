open StateDataType;

open GLSLLocationType;

let restore = (intersectShaderIndexDataArray, currentState, targetState) => {
  let {attributeLocationMap, uniformLocationMap} = currentState.glslLocationRecord;
  {
    ...targetState,
    glslLocationRecord: {
      attributeLocationMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          attributeLocationMap
        ),
      uniformLocationMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformLocationMap
        )
    }
  }
};