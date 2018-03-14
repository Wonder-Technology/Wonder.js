open StateDataType;

open MaterialType;

open BasicMaterialType;

let unsafeGetShaderIndex = (materialIndex: int, {basicMaterialRecord}) =>
  ShaderIndexMapService.unsafeGetShaderIndex(materialIndex, basicMaterialRecord.shaderIndexMap);

let hasShaderIndex = (materialIndex: int, {basicMaterialRecord}) =>
  ShaderIndexMapService.hasShaderIndex(materialIndex, basicMaterialRecord.shaderIndexMap);

let setShaderIndex =
  [@bs]
  (
    (materialIndex: int, shaderIndex: int, {basicMaterialRecord} as state) => {
      let {shaderIndexMap} as record = basicMaterialRecord;
      {
        ...state,
        basicMaterialRecord: {
          ...record,
          shaderIndexMap:
            ShaderIndexMapService.setShaderIndex(materialIndex, shaderIndex, shaderIndexMap)
        }
      }
    }
  );