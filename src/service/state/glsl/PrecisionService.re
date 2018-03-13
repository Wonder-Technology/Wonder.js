open StateDataType;

open GPUDetectType;

open ShaderChunkSystem;

let getPrecisionSource = ({gpuDetectRecord} as state) => {
  let {precision} = gpuDetectRecord;
  switch (precision |> OptionService.unsafeGet) {
  | HIGHP => getChunk("highp_fragment", state).top
  | MEDIUMP => getChunk("mediump_fragment", state).top
  | LOWP => getChunk("lowp_fragment", state).top
  | _ => getChunk("highp_fragment", state).top
  }
};