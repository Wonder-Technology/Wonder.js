open ShaderType;

let create = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.HashMapSystem.createEmpty(),
  glslData: {precision: None}
};