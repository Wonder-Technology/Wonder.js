open StateDataRenderWorkerType;

open RenderWorkerBasicMaterialType;

let _createTypeArrays = (basicMaterialCount, textureCountPerBasicMaterial, state) => {
  let {buffer} as basicMaterialRecord = RecordBasicMaterialRenderWorkerService.getRecord(state);
  let (shaderIndices, colors, textureIndices, mapUnits) =
    CreateTypeArrayBasicMaterialService.createTypeArrays(
      buffer,
      basicMaterialCount,
      textureCountPerBasicMaterial
    );
  state.basicMaterialRecord =
    Some({
      ...basicMaterialRecord,
      shaderIndices: Some(shaderIndices),
      colors: Some(colors),
      textureIndices: Some(textureIndices),
      mapUnits: Some(mapUnits)
    });
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let basicMaterialData = data##basicMaterialData;
      let basicMaterialCount = data##bufferData##basicMaterialDataBufferCount;
      let textureCountPerBasicMaterial = data##bufferData##textureCountPerBasicMaterial;
      state
      |> _createTypeArrays(basicMaterialCount, textureCountPerBasicMaterial)
      |> InitMaterialRenderWorkerJobUtils.initMaterials(
           (
             CreateInitBasicMaterialStateRenderWorkerService.createInitMaterialState,
             InitInitBasicMaterialService.init
           ),
           RecordBasicMaterialRenderWorkerService.getRecord(state).isSourceInstanceMap
         )
      |> StateRenderWorkerService.setState(stateData);
      e
    }
  );