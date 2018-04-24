open ShaderType;

let create = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.HashMapService.createEmpty()
};

let deepCopyForRestore = ({index, shaderIndexMap}) => {index, shaderIndexMap};