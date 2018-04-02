open MainStateDataType;

let deepCopyForRestore = (state: MainStateDataType.state) => {
  let state =
    state
    |> RecordTransformMainService.deepCopyForRestore
    |> RecordBasicMaterialMainService.deepCopyForRestore
    |> RecordLightMaterialMainService.deepCopyForRestore
    |> RecordBoxGeometryMainService.deepCopyForRestore
    |> RecordCustomGeometryMainService.deepCopyForRestore;
  {
    ...state,
    gameObjectRecord: RecordGameObjectService.deepCopyForRestore(state.gameObjectRecord),
    basicCameraViewRecord:
      RecordBasicCameraViewService.deepCopyForRestore(state.basicCameraViewRecord),
    perspectiveCameraProjectionRecord:
      RecordPerspectiveCameraProjectionService.deepCopyForRestore(
        state.perspectiveCameraProjectionRecord
      ),
    meshRendererRecord: RecordMeshRendererService.deepCopyForRestore(state.meshRendererRecord),
    typeArrayPoolRecord: RecordTypeArrayPoolService.deepCopyForRestore(state.typeArrayPoolRecord),
    ambientLightRecord: RecordAmbientLightService.deepCopyForRestore(state.ambientLightRecord),
    directionLightRecord:
      RecordDirectionLightService.deepCopyForRestore(state.directionLightRecord),
    pointLightRecord: RecordPointLightService.deepCopyForRestore(state.pointLightRecord),
    sourceInstanceRecord:
      RecordSourceInstanceService.deepCopyForRestore(state.sourceInstanceRecord),
    objectInstanceRecord:
      RecordObjectInstanceService.deepCopyForRestore(state.objectInstanceRecord),
    vboBufferRecord: RecordVboBufferService.deepCopyForRestore(state.vboBufferRecord),
    deviceManagerRecord: RecordDeviceManagerService.deepCopyForRestore(state.deviceManagerRecord),
    shaderRecord: RecordShaderService.deepCopyForRestore(state.shaderRecord),
    glslRecord: RecordGLSLService.deepCopyForRestore(state.glslRecord)
  }
};