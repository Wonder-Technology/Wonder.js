let addBasicMaterialSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "color" =>
    HandleUniformRenderObjectMaterialMainService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      OperateBasicMaterialMainService.unsafeGetColor
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
    HandleUniformRenderObjectMaterialMainService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      OperateLightMaterialMainService.unsafeGetDiffuseColor
    )
  | "specularColor" =>
    HandleUniformRenderObjectMaterialMainService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      OperateLightMaterialMainService.unsafeGetSpecularColor
    )
  | "shininess" =>
    HandleUniformRenderObjectMaterialMainService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      OperateLightMaterialMainService.unsafeGetShininess
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