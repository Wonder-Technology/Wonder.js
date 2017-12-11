open ShaderType;

let initData = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.HashMapSystem.createEmpty(),
  glslData: {precision: None}
};