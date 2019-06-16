open RenderWorkerBasicMaterialType;

open RenderWorkerLightMaterialType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let basicMaterialData = data##basicMaterialData;
    state.basicMaterialRecord =
      Some({
        shaderIndices: None,
        colors: None,
        isDepthTests: None,
        alphas: None,
        index: basicMaterialData##index,
        disposedIndexArray: basicMaterialData##disposedIndexArray,
        isSourceInstanceMap: basicMaterialData##isSourceInstanceMap,
      });
    let lightMaterialData = data##lightMaterialData;
    state.lightMaterialRecord =
      Some({
        shaderIndices: None,
        diffuseColors: None,
        specularColors: None,
        shininess: None,
        index: lightMaterialData##index,
        diffuseTextureIndices: None,
        specularTextureIndices: None,
        disposedIndexArray: lightMaterialData##disposedIndexArray,
        isSourceInstanceMap: lightMaterialData##isSourceInstanceMap,
      });
    StateRenderWorkerService.setState(stateData, state);
    e;
  });