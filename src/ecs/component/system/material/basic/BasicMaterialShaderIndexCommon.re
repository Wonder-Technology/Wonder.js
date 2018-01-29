open BasicMaterialStateCommon;

open StateDataType;

open MaterialType;

open BasicMaterialType;

let unsafeGetShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  MaterialShaderIndexCommon.unsafeGetShaderIndex(
    materialIndex,
    getMaterialData(state).shaderIndexMap
  );

let hasShaderIndex = (materialIndex: int, state: StateDataType.state) =>
  MaterialShaderIndexCommon.hasShaderIndex(materialIndex, getMaterialData(state).shaderIndexMap);

let setShaderIndex =
  [@bs]
  (
    (materialIndex: int, shaderIndex: int, state: StateDataType.state) => {
      let {shaderIndexMap} as data = getMaterialData(state);
      {
        ...state,
        basicMaterialData: {
          ...data,
          shaderIndexMap:
            MaterialShaderIndexCommon.setShaderIndex(materialIndex, shaderIndex, shaderIndexMap)
        }
      }
    }
  );