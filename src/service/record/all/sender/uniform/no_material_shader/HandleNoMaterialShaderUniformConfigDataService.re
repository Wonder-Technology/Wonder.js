open GLSLSenderType;

let _addUniformSendDataByType =
    (
      (shaderCacheMap, name, pos),
      {
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr,
        noMaterialShaderSendCachableDataArr,
      },
      (getDataFunc, sendDataFunc),
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
           sendDataFunc,
           /* SendUniformService.getSendCachableDataByType(type_), */
           getDataFunc: getDataFunc |> Obj.magic,
         }: uniformNoMaterialShaderSendData,
       ),
};

let addSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArr) =>
  switch (field) {
  | "outlineExpand" =>
    _addUniformSendDataByType(
      (uniformCacheMap, name, pos),
      sendDataArr,
      (
        GetOutlineDataGetRenderDataService.getColor,
        SendUniformService.getSendCachableDataByType(type_),
      ),
    )
  /* TODO test or remove */
  | "skyboxVMatrix" =>
    _addUniformSendDataByType(
      (uniformCacheMap, name, pos),
      sendDataArr,
      /* GetSkyboxDataGetRenderDataService.getSkyboxVMatrix, */
      (
        GetSkyboxDataGetRenderDataService.getSkyboxVMatrix,
        SendUniformService.getSendNoCachableDataByType(type_),
      ),
    )
  | "skyboxCubeMap" =>
    _addUniformSendDataByType(
      (uniformCacheMap, name, pos),
      sendDataArr,
      (
        GetSkyboxDataGetRenderDataService.unsafeGetGlCubeTexture,
        SendUniformService.getSendCachableDataByType(type_),
      ),
    )
  /* TODO refactor(extend): move to editor */
  /* TODO need test in editor*/
  | "rotationGizmoForEditor" =>
    switch (name) {
    | "u_alpha"
    | "u_cameraPosInLocalCoordSystem"
    | "u_color" =>
      _addUniformSendDataByType(
        (uniformCacheMap, name, pos),
        sendDataArr,
        /* TODO refactor(extend): change to custom shader instead of no material shader! */
        /* GetBasicMaterialDataGetRenderDataService.getColor */
        (
          Obj.magic(-1),
          SendUniformService.getSendCachableDataByType(type_),
        ),
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