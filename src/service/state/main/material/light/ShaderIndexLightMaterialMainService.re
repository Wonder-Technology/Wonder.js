open MaterialType;

open MainStateDataType;

open LightMaterialType;

let unsafeGetShaderIndex = (materialIndex: int, {lightMaterialRecord}) =>
  ShaderIndexMapService.unsafeGetShaderIndex(materialIndex, lightMaterialRecord.shaderIndexMap);

let hasShaderIndex = (materialIndex: int, {lightMaterialRecord}) =>
  ShaderIndexMapService.hasShaderIndex(materialIndex, lightMaterialRecord.shaderIndexMap);

let setShaderIndex =
  [@bs]
  (
    (materialIndex: int, shaderIndex: int, {lightMaterialRecord} as state) => {
      let {shaderIndexMap} as record = lightMaterialRecord;
      {
        ...state,
        lightMaterialRecord: {
          ...record,
          shaderIndexMap:
            ShaderIndexMapService.setShaderIndex(materialIndex, shaderIndex, shaderIndexMap)
        }
      }
    }
  );