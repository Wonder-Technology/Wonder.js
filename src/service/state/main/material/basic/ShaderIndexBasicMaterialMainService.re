open StateDataMainType;

open MaterialType;

open BasicMaterialType;

let getShaderIndex = (materialIndex: int, state) =>
  ShaderIndicesService.getShaderIndex(
    materialIndex,
    RecordBasicMaterialMainService.getRecord(state).shaderIndices
  );

/* let hasShaderIndex = (materialIndex: int, state) =>
   ShaderIndicesService.hasShaderIndex(
     materialIndex,
     RecordBasicMaterialMainService.getRecord(state).shaderIndices
   ); */
let setShaderIndex =
  [@bs]
  (
    (materialIndex: int, shaderIndex: int, state) => {
      let {shaderIndices} as record = state |> RecordBasicMaterialMainService.getRecord;
      {
        ...state,
        basicMaterialRecord:
          Some({
            ...record,
            shaderIndices:
              [@bs] ShaderIndicesService.setShaderIndex(materialIndex, shaderIndex, shaderIndices)
          })
      }
    }
  );