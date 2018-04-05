let addBasicMaterialSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "color" =>
    HandleUniformRenderObjectMaterialService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      GetBasicMaterialDataRenderService.getColor
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

let addLightMaterialSendData =
    (
      (field, pos, name, type_, uniformCacheMap),
      /* (getDiffuseColorFunc, getSpecularColorFunc, getShininessFunc), */
      sendDataArrTuple
    ) =>
  switch field {
  | "diffuseColor" =>
    HandleUniformRenderObjectMaterialService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      GetLightMaterialDataRenderService.getDiffuseColor
    )
  | "specularColor" =>
    HandleUniformRenderObjectMaterialService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      GetLightMaterialDataRenderService.getSpecularColor
    )
  | "shininess" =>
    HandleUniformRenderObjectMaterialService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      GetLightMaterialDataRenderService.getShininess
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