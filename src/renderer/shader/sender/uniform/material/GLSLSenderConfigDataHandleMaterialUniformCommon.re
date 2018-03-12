let addBasicMaterialSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "color" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      OperateBasicMaterialService.unsafeGetColor
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
      OperateLightMaterialService.unsafeGetDiffuseColor
    )
  | "specularColor" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      OperateLightMaterialService.unsafeGetSpecularColor
    )
  | "shininess" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      OperateLightMaterialService.unsafeGetShininess
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