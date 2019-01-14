open GLSLSenderType;

let _addUniformSendDataByType =
    (
      (shaderCacheMap, name, pos, type_),
      /* (
           renderObjectSendModelDataArr,
           renderObjectSendMaterialDataArr,
           shaderSendNoCachableDataArr,
           shaderSendCachableDataArr,
           shaderSendCachableFunctionDataArr,
           instanceSendNoCachableDataArr,
         ), */
      noMaterialShaderSendCachableDataArr,
      getDataFunc,
    ) =>
  noMaterialShaderSendCachableDataArr
  |> ArrayService.push(
       {
         shaderCacheMap,
         name,
         pos,
         sendDataFunc: SendUniformService.getSendCachableDataByType(type_),
         getDataFunc: getDataFunc |> Obj.magic,
       }: uniformNoMaterialShaderSendCachableData,
     );

let addSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArr) =>
  switch (field) {
  | "outlineExpand" =>
    _addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArr,
      GetOutlineDataGetRenderDataService.getColor,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="addSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let setToUniformSendMap = (shaderIndex, uniformSendDataMap, sendDataArr) =>
  uniformSendDataMap
  |> WonderCommonlib.SparseMapService.set(shaderIndex, sendDataArr)
  |> ignore;