let addBasicMaterialSendData =
    ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch (field) {
  | "color" =>
    HandleUniformRenderObjectMaterialService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      GetBasicMaterialDataGetRenderDataService.getColor,
    )
  | "alpha" =>
    HandleUniformRenderObjectMaterialService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      GetBasicMaterialDataGetRenderDataService.getAlpha,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addBasicMaterialSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let _addLightMaterialSendColorData =
    (field, (uniformCacheMap, name, pos, type_), sendDataArrTuple) =>
  switch (field) {
  | "diffuseColor" =>
    HandleUniformRenderObjectMaterialService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      GetLightMaterialDataGetRenderDataService.getDiffuseColor,
    )
  | "specularColor" =>
    HandleUniformRenderObjectMaterialService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      GetLightMaterialDataGetRenderDataService.getSpecularColor,
    )
  };

let _addLightMaterialSendMapData =
    (field, (uniformCacheMap, name, pos, type_), sendDataArrTuple) =>
  switch (field) {
  | "diffuseMap" =>
    HandleUniformRenderObjectMaterialService.addUniformTextureSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      GetLightMaterialDataGetRenderDataService.getDiffuseMapUnit,
    )
  | "specularMap" =>
    HandleUniformRenderObjectMaterialService.addUniformTextureSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      GetLightMaterialDataGetRenderDataService.getSpecularMapUnit,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addLightMaterialSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let addLightMaterialSendData =
    ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch (field) {
  | "diffuseColor"
  | "specularColor" =>
    _addLightMaterialSendColorData(
      field,
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
    )
  | "shininess" =>
    HandleUniformRenderObjectMaterialService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      GetLightMaterialDataGetRenderDataService.getShininess,
    )
  | "diffuseMap"
  | "specularMap" =>
    _addLightMaterialSendMapData(
      field,
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addLightMaterialSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };