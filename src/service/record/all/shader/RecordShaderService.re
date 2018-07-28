open ShaderType;

let create = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.HashMapService.createEmpty(),
  usedShaderIndexArray: [||],
};

let deepCopyForRestore = ({index, shaderIndexMap, usedShaderIndexArray}) => {
  index,
  shaderIndexMap: shaderIndexMap |> HashMapService.copy,
  usedShaderIndexArray: usedShaderIndexArray |> Js.Array.copy,
};