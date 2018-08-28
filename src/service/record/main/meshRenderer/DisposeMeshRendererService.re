open MeshRendererType;

open DisposeComponentService;

let _batchRemoveFromRenderArray =
    (disposedGameObjectUidMap, renderGameObjectArray) =>
  batchRemoveFromArray(disposedGameObjectUidMap, renderGameObjectArray);

let isAlive = (meshRenderer, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(meshRenderer, disposedIndexArray);

let _disposeData =
    (
      meshRenderer: meshRenderer,
      {
        drawModes,
        isRenders,
        gameObjectMap,
        basicMaterialRenderGameObjectMap,
        lightMaterialRenderGameObjectMap,
      } as record,
    ) => {
  ...record,
  drawModes:
    DisposeTypeArrayService.deleteAndResetUint8(.
      meshRenderer,
      BufferMeshRendererService.getDefaultDrawMode()
      |> DrawModeType.drawModeToUint8,
      drawModes,
    ),
  isRenders:
    DisposeTypeArrayService.deleteAndResetUint8(.
      meshRenderer,
      BufferMeshRendererService.getDefaultIsRender(),
      isRenders,
    ),
  basicMaterialRenderGameObjectMap:
    basicMaterialRenderGameObjectMap |> disposeSparseMapData(meshRenderer),
  lightMaterialRenderGameObjectMap:
    lightMaterialRenderGameObjectMap |> disposeSparseMapData(meshRenderer),
  gameObjectMap: gameObjectMap |> disposeSparseMapData(meshRenderer),
};

let handleBatchDisposeComponent =
  (. meshRendererArray: array(meshRenderer), {disposedIndexArray} as record) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                meshRendererArray,
                isAlive,
                record,
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );

    switch (meshRendererArray |> Js.Array.length) {
    | 0 => record
    | _ =>
      let record = {
        ...record,
        disposedIndexArray:
          disposedIndexArray |> Js.Array.concat(meshRendererArray),
      };
      meshRendererArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. record, meshRenderer) => record |> _disposeData(meshRenderer),
           record,
         );
    };
  };