open StateDataMainType;

open BasicMaterialType;

let _resetShaderIndices = (state) => {
  let {index, shaderIndices, defaultShaderIndex} as record =
    RecordBasicMaterialMainService.getRecord(state);
  {
    ...state,
    basicMaterialRecord:
      Some({
        ...record,
        shaderIndices:
          RestoreMaterialService.resetShaderIndices(index, defaultShaderIndex, shaderIndices)
      })
  }
};

let _restoreTypeArrays = (currentBasicMaterialRecord, targetBasicMaterialRecord) =>
  currentBasicMaterialRecord.shaderIndices === targetBasicMaterialRecord.shaderIndices
  && currentBasicMaterialRecord.colors === targetBasicMaterialRecord.colors ?
    (currentBasicMaterialRecord, targetBasicMaterialRecord) :
    {
      let (shaderIndices, colors) =
        (currentBasicMaterialRecord.shaderIndices, currentBasicMaterialRecord.colors)
        |> RecordBasicMaterialMainService.setDefaultTypeArrData(
             currentBasicMaterialRecord.index,
             currentBasicMaterialRecord.defaultShaderIndex,
             currentBasicMaterialRecord.defaultColor
           );
      TypeArrayService.fillUint32ArrayWithUint32Array(
        (currentBasicMaterialRecord.shaderIndices, 0),
        (targetBasicMaterialRecord.shaderIndices, 0),
        Js.Typed_array.Uint32Array.length(targetBasicMaterialRecord.shaderIndices)
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentBasicMaterialRecord.colors, 0),
        (targetBasicMaterialRecord.colors, 0),
        Js.Typed_array.Float32Array.length(targetBasicMaterialRecord.colors)
      )
      |> ignore;
      (currentBasicMaterialRecord, targetBasicMaterialRecord)
    };

let restore = (gl, currentState, targetState) => {
  let targetState = _resetShaderIndices(targetState);
  let targetState =
    targetState
    |> InitBasicMaterialMainService.initMaterials(
         AliveMaterialService.getAllAliveMaterials(
           RecordBasicMaterialMainService.getRecord(targetState).gameObjectMap
         ),
         gl
       );
  let currentBasicMaterialRecord = RecordBasicMaterialMainService.getRecord(currentState);
  let targetBasicMaterialRecord = RecordBasicMaterialMainService.getRecord(targetState);
  let (currentBasicMaterialRecord, targetBasicMaterialRecord) =
    _restoreTypeArrays(currentBasicMaterialRecord, targetBasicMaterialRecord);
  {
    ...targetState,
    basicMaterialRecord:
      Some({
        ...targetBasicMaterialRecord,
        buffer: currentBasicMaterialRecord.buffer,
        shaderIndices: currentBasicMaterialRecord.shaderIndices,
        colors: currentBasicMaterialRecord.colors
      })
  }
};