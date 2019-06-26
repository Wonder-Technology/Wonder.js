open AllGPUDetectType;

open ShaderChunkSystem;

let getPrecisionSource = (gpuDetectRecord, glslChunkRecord) => {
  let {precision} = gpuDetectRecord;
  let default = getChunk("highp_fragment", glslChunkRecord).top;
  switch gpuDetectRecord.precision {
  | None => default
  | Some(precision) =>
    switch precision {
    | HIGHP => getChunk("highp_fragment", glslChunkRecord).top
    | MEDIUMP => getChunk("mediump_fragment", glslChunkRecord).top
    | LOWP => getChunk("lowp_fragment", glslChunkRecord).top
    | _ => default
    }
  }
};