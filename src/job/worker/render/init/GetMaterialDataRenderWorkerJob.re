open RenderWorkerBasicMaterialType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let basicMaterialData = data##basicMaterialData;
      state.basicMaterialRecord =
        Some({
          buffer: basicMaterialData##buffer,
          shaderIndices: None,
          colors: None,
          index: basicMaterialData##index,
          disposedIndexArray: basicMaterialData##disposedIndexArray,
          isSourceInstanceMap: basicMaterialData##isSourceInstanceMap
        });
      let lightMaterialData = data##lightMaterialData;
      state.lightMaterialRecord =
        Some({
          buffer: lightMaterialData##buffer,
          shaderIndices: None,
          diffuseColors: None,
          specularColors: None,
          shininess: None,
          index: lightMaterialData##index,
          disposedIndexArray: lightMaterialData##disposedIndexArray,
          isSourceInstanceMap: lightMaterialData##isSourceInstanceMap
        });
      e
    }
  );