open StateDataRenderWorkerType;

open RenderWorkerArrayBufferViewSourceTextureType;

let setSourceMap = (sourceMap, state) => {
  let record = RecordArrayBufferViewSourceTextureRenderWorkerService.getRecord(state);
  {...state, arrayBufferViewSourceTextureRecord: Some({...record, sourceMap: Some(sourceMap)})}
};

let addSourceArray = (sourceArray, state) => {
  let record = RecordArrayBufferViewSourceTextureRenderWorkerService.getRecord(state);
  let sourceMap = record.sourceMap |> OptionService.unsafeGet;
  sourceArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (sourceMap, (texture, uint8Array)) =>
           TextureSourceMapService.addSource(texture, uint8Array, sourceMap)
       ),
       sourceMap
     );
  {...state, arrayBufferViewSourceTextureRecord: Some({...record, sourceMap: Some(sourceMap)})}
};