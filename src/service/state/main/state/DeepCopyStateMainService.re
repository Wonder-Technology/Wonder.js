open StateDataMainType;

let deepCopyForRestore = (state: StateDataMainType.state) => {
  let state =
    state
    |> RecordEventMainService.deepCopyForRestore
    |> RecordTransformMainService.deepCopyForRestore
    |> RecordBasicMaterialMainService.deepCopyForRestore
    |> RecordLightMaterialMainService.deepCopyForRestore
    |> RecordMeshRendererMainService.deepCopyForRestore
    |> RecordGeometryMainService.deepCopyForRestore
    |> RecordScriptMainService.deepCopyForRestore
    |> RecordSourceInstanceMainService.deepCopyForRestore
    |> RecordDirectionLightMainService.deepCopyForRestore
    |> RecordPointLightMainService.deepCopyForRestore
    |> RecordBasicSourceTextureMainService.deepCopyForRestore
    |> RecordArrayBufferViewSourceTextureMainService.deepCopyForRestore
    |> RecordCubemapTextureMainService.deepCopyForRestore;

  {
    ...state,
    gameObjectRecord:
      RecordGameObjectService.deepCopyForRestore(state.gameObjectRecord),
    basicCameraViewRecord:
      RecordBasicCameraViewService.deepCopyForRestore(
        state.basicCameraViewRecord,
      ),
    perspectiveCameraProjectionRecord:
      RecordPerspectiveCameraProjectionService.deepCopyForRestore(
        state.perspectiveCameraProjectionRecord,
      ),
    flyCameraControllerRecord:
      RecordFlyCameraControllerService.deepCopyForRestore(
        state.flyCameraControllerRecord,
      ),
    arcballCameraControllerRecord:
      RecordArcballCameraControllerService.deepCopyForRestore(
        state.arcballCameraControllerRecord,
      ),
    typeArrayPoolRecord:
      RecordTypeArrayPoolService.deepCopyForRestore(
        state.typeArrayPoolRecord,
      ),
    objectInstanceRecord:
      RecordObjectInstanceService.deepCopyForRestore(
        state.objectInstanceRecord,
      ),
    vboBufferRecord:
      RecordVboBufferService.deepCopyForRestore(state.vboBufferRecord),
    deviceManagerRecord:
      RecordAllDeviceManagerService.deepCopyForRestore(
        state.deviceManagerRecord,
      ),
    shaderRecord:
      RecordAllShaderService.deepCopyForRestore(state.shaderRecord),
    glslRecord: RecordAllGLSLService.deepCopyForRestore(state.glslRecord),
    glslSenderRecord:
      RecordGLSLSenderAllService.deepCopyForRestore(state.glslSenderRecord),
  };
};