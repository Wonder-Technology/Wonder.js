open StateDataMainType;

let build = (meshRendererDataMap, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(GenerateCommon.checkShouldHasNoSlot(meshRendererDataMap))
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  meshRendererDataMap
  |> SparseMapService.reduceValid(
       (. meshRendererDataArr, meshRenderer) =>
         meshRendererDataArr
         |> ArrayService.push(
              {
                drawMode:
                  OperateMeshRendererMainService.getDrawMode(
                    meshRenderer,
                    state,
                  ),
              }: GenerateSceneGraphType.meshRendererData,
            ),
       [||],
     );
};