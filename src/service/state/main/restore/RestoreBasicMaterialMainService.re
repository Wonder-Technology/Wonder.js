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
  && currentBasicMaterialRecord.colors === targetBasicMaterialRecord.colors
  && currentBasicMaterialRecord.textureIndices === targetBasicMaterialRecord.textureIndices
  && currentBasicMaterialRecord.textureCounts === targetBasicMaterialRecord.textureCounts ?
    (currentBasicMaterialRecord, targetBasicMaterialRecord) :
    {
      let (shaderIndices, colors, textureIndices, textureCounts) =
        (
          currentBasicMaterialRecord.shaderIndices,
          currentBasicMaterialRecord.colors,
          currentBasicMaterialRecord.textureIndices,
          currentBasicMaterialRecord.textureCounts
        )
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
      TypeArrayService.fillUint32ArrayWithUint32Array(
        (currentBasicMaterialRecord.textureIndices, 0),
        (targetBasicMaterialRecord.textureIndices, 0),
        Js.Typed_array.Uint32Array.length(targetBasicMaterialRecord.textureIndices)
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentBasicMaterialRecord.textureCounts, 0),
        (targetBasicMaterialRecord.textureCounts, 0),
        Js.Typed_array.Uint8Array.length(targetBasicMaterialRecord.textureCounts)
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
        colors: currentBasicMaterialRecord.colors,
        /* TODO test */
        textureIndices: currentBasicMaterialRecord.textureIndices,
        textureCounts: currentBasicMaterialRecord.textureCounts
      })
  }
};