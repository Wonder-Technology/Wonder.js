open StateRenderType;

open TransformType;

open BoxGeometryType;

open CustomGeometryType;

open BasicMaterialType;

open AmbientLightType;

open DirectionLightType;

open PointLightType;

let createRenderState =
    (
      {glslSenderRecord, programRecord, ambientLightRecord, direcitionLightRecord, pointLightRecord} as state: StateDataMainType.state
    ) => {
  let {localToWorldMatrices, localPositions, normalMatrixCacheMap} =
    RecordTransformMainService.getRecord(state);
  let {vertices, normals, indices} = RecordBoxGeometryMainService.getRecord(state);
  let {vertices, normals, indices, verticesInfoArray, normalsInfoArray, indicesInfoArray} =
    RecordCustomGeometryMainService.getRecord(state);
  let {colors} = RecordBasicMaterialMainService.getRecord(state);
  let {index, colors} = ambientLightRecord;
  let {index, colors, intensities} = directionLightRecord;
  let {index, colors, intensities, constants, linears, quadratics, ranges} = pointLightRecord;
  {
    glslSenderRecord,
    programRecord,
    boxGeometryRecord: {vertices, normals, indices},
    customGeometryRecord: {
      vertices,
      normals,
      indices,
      verticesInfoArray,
      normalsInfoArray,
      indicesInfoArray
    },
    cameraRecord: OperateRenderMainService.getCameraRecord(state),
    basicMaterialRecord: {colors: colors},
    ambientLightRecord: {index, colors},
    directionLightRecord: {
      index,
      colors,
      intensities,
      positionMap:
        PositionLightMainService.buildPositionMap(
          index,
          PositionDirectionLightMainService.getPosition,
          state
        )
    },
    pointLightRecord: {
      index,
      colors,
      intensities,
      constants,
      linears,
      quadratics,
      ranges,
      positionMap:
        PositionLightMainService.buildPositionMap(
          index,
          PositionPointLightMainService.getPosition,
          state
        )
    },
    transformRecord: {localToWorldMatrices, localPositions, normalMatrixCacheMap}
  }
};