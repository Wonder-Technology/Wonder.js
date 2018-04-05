open MainStateDataType;

open GPUDetectType;

open ShaderChunkSystem;

let getPrecisionSource = (gpuDetectRecord, glslChunkRecord) => {
  let {precision} = gpuDetectRecord;
  switch (precision |> OptionService.unsafeGet) {
  | HIGHP => getChunk("highp_fragment", glslChunkRecord).top
  | MEDIUMP => getChunk("mediump_fragment", glslChunkRecord).top
  | LOWP => getChunk("lowp_fragment", glslChunkRecord).top
  | _ => getChunk("highp_fragment", glslChunkRecord).top
  }
};