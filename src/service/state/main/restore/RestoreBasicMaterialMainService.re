open StateDataMainType;

open BasicMaterialType;

let _resetShaderIndices = state => {
  let {index, shaderIndices} as record =
    RecordBasicMaterialMainService.getRecord(state);
  {
    ...state,
    basicMaterialRecord:
      Some({
        ...record,
        shaderIndices:
          RestoreMaterialService.resetShaderIndices(
            index,
            DefaultTypeArrayValueService.getDefaultShaderIndex(),
            shaderIndices,
          ),
      }),
  };
};

let _restoreTypeArrays =
    (currentBasicMaterialRecord, targetBasicMaterialRecord) =>
  currentBasicMaterialRecord.shaderIndices
  === targetBasicMaterialRecord.shaderIndices
  && currentBasicMaterialRecord.colors === targetBasicMaterialRecord.colors
  && currentBasicMaterialRecord.isDepthTests
  === targetBasicMaterialRecord.isDepthTests ?
    (currentBasicMaterialRecord, targetBasicMaterialRecord) :
    {
      let (shaderIndices, colors, isDepthTests, alphas) =
        (
          currentBasicMaterialRecord.shaderIndices,
          currentBasicMaterialRecord.colors,
          currentBasicMaterialRecord.isDepthTests,
          currentBasicMaterialRecord.alphas,
        )
        |> RecordBasicMaterialMainService.setAllTypeArrDataToDefault(
             currentBasicMaterialRecord.index,
             DefaultTypeArrayValueService.getDefaultShaderIndex(),
             currentBasicMaterialRecord.defaultColor,
           );
      TypeArrayService.fillUint32ArrayWithUint32Array(
        (currentBasicMaterialRecord.shaderIndices, 0),
        (targetBasicMaterialRecord.shaderIndices, 0),
        Js.Typed_array.Uint32Array.length(
          targetBasicMaterialRecord.shaderIndices,
        ),
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentBasicMaterialRecord.colors, 0),
        (targetBasicMaterialRecord.colors, 0),
        Js.Typed_array.Float32Array.length(targetBasicMaterialRecord.colors),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentBasicMaterialRecord.isDepthTests, 0),
        (targetBasicMaterialRecord.isDepthTests, 0),
        Js.Typed_array.Uint8Array.length(
          targetBasicMaterialRecord.isDepthTests,
        ),
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentBasicMaterialRecord.alphas, 0),
        (targetBasicMaterialRecord.alphas, 0),
        Js.Typed_array.Float32Array.length(targetBasicMaterialRecord.alphas),
      )
      |> ignore;
      (currentBasicMaterialRecord, targetBasicMaterialRecord);
    };

let restore = (gl, currentState, targetState) => {
  let targetState = _resetShaderIndices(targetState);
  let {index, disposedIndexArray} =
    RecordBasicMaterialMainService.getRecord(targetState);
  let targetState =
    targetState
    |> InitBasicMaterialMainService.initMaterials(
         AliveMaterialService.getAllAliveMaterials(index, disposedIndexArray),
         gl,
       );
  let currentBasicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(currentState);
  let targetBasicMaterialRecord =
    RecordBasicMaterialMainService.getRecord(targetState);
  let (currentBasicMaterialRecord, targetBasicMaterialRecord) =
    _restoreTypeArrays(currentBasicMaterialRecord, targetBasicMaterialRecord);
  {
    ...targetState,
    basicMaterialRecord:
      Some({
        ...targetBasicMaterialRecord,
        buffer: currentBasicMaterialRecord.buffer,
        shaderIndices: currentBasicMaterialRecord.shaderIndices,
        colors: currentBasicMaterialRecord.colors,
        isDepthTests: currentBasicMaterialRecord.isDepthTests,
        alphas: currentBasicMaterialRecord.alphas,
      }),
  };
};