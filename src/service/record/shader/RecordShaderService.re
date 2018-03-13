open ShaderType;

let create = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.HashMapSystem.createEmpty()
};

let deepCopyForRestore = ({index, shaderIndexMap}) => {index, shaderIndexMap};