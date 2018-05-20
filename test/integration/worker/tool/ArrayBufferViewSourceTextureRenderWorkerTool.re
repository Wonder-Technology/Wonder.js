open StateDataRenderWorkerType;

open RenderWorkerArrayBufferViewSourceTextureType;

let unsafeGetSource = (texture, state) => {
  let {sourceMap} = RecordArrayBufferViewSourceTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        MainStateTool.unsafeGetState()
      )
    ),
    sourceMap |> OptionService.unsafeGet
  )
};

let prepareStateAndCreateTwoMaps = (sandbox) => {
  let state = InitArrayBufferViewTextureRenderWorkerTool.prepareState(sandbox);
  let (state, map1) = ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(state);
  let (state, map2) = ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(state);
  let source1 = ArrayBufferViewSourceTextureTool.buildSource();
  let source2 = ArrayBufferViewSourceTextureTool.buildSource();
  let state =
    state |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureSource(map1, source1);
  let state =
    state |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureSource(map2, source2);
  (state, (map1, map2), (source1, source2))
};