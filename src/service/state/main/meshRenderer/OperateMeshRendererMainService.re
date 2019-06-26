open MeshRendererType;

open StateDataMainType;

let getDrawMode = (meshRenderer, state) =>
  OperateTypeArrayAllMeshRendererService.getDrawMode(
    meshRenderer,
    RecordMeshRendererMainService.getRecord(state).drawModes,
  );

let setDrawMode = (meshRenderer, drawMode, state) => {
  let {drawModes} as meshRendererRecord =
    RecordMeshRendererMainService.getRecord(state);

  {
    ...state,
    meshRendererRecord:
      Some({
        ...meshRendererRecord,
        drawModes:
          OperateTypeArrayAllMeshRendererService.setDrawMode(
            meshRenderer,
            drawMode,
            drawModes,
          ),
      }),
  };
};

let getIsRender = (meshRenderer, state) =>
  OperateTypeArrayAllMeshRendererService.getIsRender(
    meshRenderer,
    RecordMeshRendererMainService.getRecord(state).isRenders,
  )
  === BufferMeshRendererService.getRender();

let _removeFromRenderGameObjectMap =
    (
      meshRenderer,
      {basicMaterialRenderGameObjectMap, lightMaterialRenderGameObjectMap} as meshRendererRecord,
    ) => {
  ...meshRendererRecord,
  basicMaterialRenderGameObjectMap:
    basicMaterialRenderGameObjectMap
    |> WonderCommonlib.MutableSparseMapService.deleteVal(meshRenderer),
  lightMaterialRenderGameObjectMap:
    lightMaterialRenderGameObjectMap
    |> WonderCommonlib.MutableSparseMapService.deleteVal(meshRenderer),
};

let _setIsRender =
    (meshRenderer, isRender: bool, {gameObjectRecord} as state) => {
  let meshRendererRecord = RecordMeshRendererMainService.getRecord(state);

  let {isRenders} as meshRendererRecord =
    isRender ?
      RenderArrayMeshRendererMainService.addToRenderGameObjectMap(
        meshRenderer,
        GameObjectMeshRendererService.unsafeGetGameObject(
          meshRenderer,
          meshRendererRecord,
        ),
        meshRendererRecord,
        gameObjectRecord,
      ) :
      RenderArrayMeshRendererService.removeFromRenderGameObjectMap(
        meshRenderer,
        meshRendererRecord,
      );

  {
    ...state,
    meshRendererRecord:
      Some({
        ...meshRendererRecord,
        isRenders:
          OperateTypeArrayAllMeshRendererService.setIsRender(
            meshRenderer,
            isRender === true ?
              BufferMeshRendererService.getRender() :
              BufferMeshRendererService.getNotRender(),
            isRenders,
          ),
      }),
  };
};

let setIsRender = (meshRenderer, isRender: bool, {gameObjectRecord} as state) =>
  isRender === getIsRender(meshRenderer, state) ?
    state :
    (
      switch (
        GameObjectMeshRendererService.getGameObject(
          meshRenderer,
          RecordMeshRendererMainService.getRecord(state),
        )
      ) {
      | Some(gameObject) =>
        !GetIsActiveGameObjectMainService.unsafeGetIsActive(gameObject, state)
        && isRender ?
          {
            WonderLog.Log.warn(
              {j|meshRenderer:$meshRenderer -> gameObject:$gameObject isn't active, can't set meshRenderer->isRender to true|j},
            );
            state;
          } :
          _setIsRender(meshRenderer, isRender, state)
      | None => _setIsRender(meshRenderer, isRender, state)
      }
    );