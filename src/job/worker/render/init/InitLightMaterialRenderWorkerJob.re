/* TODO duplicate with basic material */
open StateDataRenderWorkerType;

open RenderWorkerLightMaterialType;

let _createTypeArrays = (count, state) => {
  let {buffer} as lightMaterialRecord = RecordLightMaterialRenderWorkerService.getRecord(state);
  let (shaderIndices, diffuseColors, specularColors, shininess) =
    CreateTypeArrayLightMaterialService.createTypeArrays(buffer, count);
  state.lightMaterialRecord =
    Some({
      ...lightMaterialRecord,
      shaderIndices: Some(shaderIndices),
      diffuseColors: Some(diffuseColors),
      specularColors: Some(specularColors),
      shininess: Some(shininess)
    });
  state
};

let _initMaterials = (lightMaterialData, data, state) => {
  let {isSourceInstanceMap} = RecordLightMaterialRenderWorkerService.getRecord(state);
  InitInitLightMaterialService.init(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (isSourceInstanceMap, JudgeInstanceRenderWorkerService.isSupportInstance(state)),
    CreateInitLightMaterialStateRenderWorkerService.createInitMaterialState(state)
  )
  |> ignore;
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let lightMaterialData = data##lightMaterialData;
      let count = data##bufferData##lightMaterialDataBufferCount;
      state
      |> _createTypeArrays(count)
      |> _initMaterials(lightMaterialData, data)
      |> StateRenderWorkerService.setState(stateData);
      e
    }
  );