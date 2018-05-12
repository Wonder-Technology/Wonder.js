open StateDataRenderWorkerType;

open RenderWorkerTextureType;

let unsafeGetSource = (texture, state) => {
  let {sourceMap} = RecordTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, sourceMap)
};