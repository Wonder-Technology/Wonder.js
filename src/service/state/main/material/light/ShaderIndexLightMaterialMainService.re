open MaterialType;

open MainStateDataType;

open LightMaterialType;

let getShaderIndex = (materialIndex: int, state) =>
  ShaderIndicesService.getShaderIndex(
    materialIndex,
    RecordLightMaterialMainService.getRecord(state).shaderIndices
  );

/* let hasShaderIndex = (materialIndex: int, state) =>
  ShaderIndicesService.hasShaderIndex(
    materialIndex,
    RecordLightMaterialMainService.getRecord(state).shaderIndices
  ); */

let setShaderIndex =
  [@bs]
  (
    (materialIndex: int, shaderIndex: int, state) => {
      let {shaderIndices} as record = state |> RecordLightMaterialMainService.getRecord;
      {
        ...state,
        lightMaterialRecord:
          Some({
            ...record,
            shaderIndices:
              ShaderIndicesService.setShaderIndex(materialIndex, shaderIndex, shaderIndices)
          })
      }
    }
  );