open StateDataRenderWorkerType;

open RenderWorkerArrayBufferViewSourceTextureType;

let unsafeGetSource = (texture, state) => {
  let {sourceMap} =
    RecordArrayBufferViewSourceTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(
    texture,
    sourceMap |> OptionService.unsafeGet,
  );
};

let createTwoMaps = state => {
  let (state, map1) =
    ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(state);
  let (state, map2) =
    ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(state);
  let source1 = ArrayBufferViewSourceTextureTool.buildSource();
  let source2 = ArrayBufferViewSourceTextureTool.buildSource();
  let state =
    state
    |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureSource(
         map1,
         source1,
       );
  let state =
    state
    |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureSource(
         map2,
         source2,
       );
  let state =
    state
    |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureWidth(
         map1,
         10,
       )
    |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureHeight(
         map1,
         20,
       );
  let state =
    state
    |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureWidth(
         map2,
         10,
       )
    |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureHeight(
         map2,
         20,
       );
  (state, (map1, map2), (source1, source2));
};

let prepareStateAndCreateTwoMaps = sandbox => {
  let state =
    InitArrayBufferViewTextureRenderWorkerTool.prepareState(sandbox);
  createTwoMaps(state);
};

let prepareStateAndCreateTwoGameObjects = sandbox => {
  let state =
    InitArrayBufferViewTextureRenderWorkerTool.prepareState(sandbox);
  let (state, (map1, map2), (source1, source2)) = createTwoMaps(state);
  let (state, gameObject1, _, _, _, map1) =
    FrontRenderLightJobTool.prepareGameObjectWithDiffuseMap(
      sandbox,
      map1,
      state,
    );
  let (state, gameObject2, _, _, _, map2) =
    FrontRenderLightJobTool.prepareGameObjectWithDiffuseMap(
      sandbox,
      map2,
      state,
    );
  let state = WorkerWorkerTool.setFakeWorkersAndSetState(state);
  let (state, _, _, _) = CameraTool.createCameraGameObject(state);
  (state, (gameObject1, gameObject2), (map1, map2), (source1, source2));
};