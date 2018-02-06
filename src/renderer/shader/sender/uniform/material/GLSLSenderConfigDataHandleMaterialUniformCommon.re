let addBasicMaterialSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "color" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      BasicMaterialAdminAci.unsafeGetColor
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addBasicMaterialSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let addLightMaterialSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "diffuseColor" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      LightMaterialAdminAci.unsafeGetDiffuseColor
    )
  | "specularColor" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      LightMaterialAdminAci.unsafeGetSpecularColor
    )
  | "shininess" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      LightMaterialAdminAci.unsafeGetShininess
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addLightMaterialSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let addCameraSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "vMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderNoCachableCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraVMatrixDataFromState
    )
  | "pMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderNoCachableCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraPMatrixDataFromState
    )
  | "position" =>
    GLSLSenderConfigDataHandleUniformShaderCachableCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      RenderDataSystem.getCameraPositionDataFromState
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addCameraSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let addCameraSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "vMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderNoCachableCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraVMatrixDataFromState
    )
  | "pMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderNoCachableCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraPMatrixDataFromState
    )
  | "position" =>
    GLSLSenderConfigDataHandleUniformShaderCachableCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      RenderDataSystem.getCameraPositionDataFromState
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addCameraSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };