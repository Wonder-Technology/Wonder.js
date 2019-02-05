open GLSLSenderType;

let _addUniformSendDataByType =
    (
      (shaderCacheMap, name, pos, type_),
      {
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr,
        noMaterialShaderSendCachableDataArr,
      },
      getDataFunc,
    ) => {
  renderObjectSendModelDataArr,
  renderObjectSendMaterialDataArr,
  shaderSendNoCachableDataArr,
  shaderSendCachableDataArr,
  shaderSendCachableFunctionDataArr,
  instanceSendNoCachableDataArr,
  noMaterialShaderSendCachableDataArr:
    noMaterialShaderSendCachableDataArr
    |> ArrayService.push(
         {
           shaderCacheMap,
           name,
           pos,
           sendDataFunc: SendUniformService.getSendCachableDataByType(type_),
           getDataFunc: getDataFunc |> Obj.magic,
         }: uniformNoMaterialShaderSendCachableData,
       ),
};

let addSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArr) =>
  switch (field) {
  | "outlineExpand" =>
    _addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArr,
      GetOutlineDataGetRenderDataService.getColor,
    )
  /* TODO refactor(extend): move to editor */
  /* TODO need test in editor*/
  | "rotationGizmoForEditor" =>
    switch (name) {
    | "u_cameraPosInLocalCoordSystem"
    | "u_color" =>
      _addUniformSendDataByType(
        (uniformCacheMap, name, pos, type_),
        sendDataArr,
        /* TODO refactor(extend): change to custom shader instead of no material shader! */
        /* GetBasicMaterialDataGetRenderDataService.getColor */
        Obj.magic(-1),
      )
    }
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
  |> WonderCommonlib.MutableSparseMapService.set(shaderIndex, sendDataArr)
  |> ignore;

let unsafeGetUniformSendData =
    (shaderIndex: int, {uniformNoMaterialShaderSendCachableDataMap}) =>
  HandleUniformConfigDataMapService.unsafeGetUniformSendData(
    shaderIndex,
    uniformNoMaterialShaderSendCachableDataMap,
  );