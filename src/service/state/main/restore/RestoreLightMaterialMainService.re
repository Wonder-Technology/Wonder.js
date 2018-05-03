open StateDataMainType;

open LightMaterialType;

let _resetShaderIndices = (state) => {
  let {index, shaderIndices, defaultShaderIndex} as record =
    RecordLightMaterialMainService.getRecord(state);
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...record,
        shaderIndices:
          RestoreMaterialService.resetShaderIndices(index, defaultShaderIndex, shaderIndices)
      })
  }
};

let _restoreTypeArrays =
    (currentLightMaterialRecord, targetLightMaterialRecord, lightMaterialDataBufferCount) => {
  let (shaderIndices, diffuseColors, specularColors, shininess) =
    (
      currentLightMaterialRecord.shaderIndices,
      currentLightMaterialRecord.diffuseColors,
      currentLightMaterialRecord.specularColors,
      currentLightMaterialRecord.shininess
    )
    |> RecordLightMaterialMainService.setDefaultTypeArrData(
         lightMaterialDataBufferCount,
         (
           currentLightMaterialRecord.defaultShaderIndex,
           currentLightMaterialRecord.defaultDiffuseColor,
           currentLightMaterialRecord.defaultSpecularColor,
           currentLightMaterialRecord.defaultShininess
         )
       );
  TypeArrayService.fillUint32ArrayWithUint32Array(
    (currentLightMaterialRecord.shaderIndices, 0),
    (targetLightMaterialRecord.shaderIndices, 0),
    Js.Typed_array.Uint32Array.length(targetLightMaterialRecord.shaderIndices)
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentLightMaterialRecord.diffuseColors, 0),
    (targetLightMaterialRecord.diffuseColors, 0),
    Js.Typed_array.Float32Array.length(targetLightMaterialRecord.diffuseColors)
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentLightMaterialRecord.specularColors, 0),
    (targetLightMaterialRecord.specularColors, 0),
    Js.Typed_array.Float32Array.length(targetLightMaterialRecord.specularColors)
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentLightMaterialRecord.shininess, 0),
    (targetLightMaterialRecord.shininess, 0),
    Js.Typed_array.Float32Array.length(targetLightMaterialRecord.shininess)
  )
  |> ignore;
  (currentLightMaterialRecord, targetLightMaterialRecord)
};

let restore = (gl, currentState, targetState) => {
  let targetState = _resetShaderIndices(targetState);
  let targetState =
    targetState
    |> InitLightMaterialMainService.initMaterials(
         AliveMaterialService.getAllAliveMaterials(
           RecordLightMaterialMainService.getRecord(targetState).gameObjectMap
         ),
         gl
       );
  let currentLightMaterialRecord = RecordLightMaterialMainService.getRecord(currentState);
  let targetLightMaterialRecord = RecordLightMaterialMainService.getRecord(targetState);
  let lightMaterialDataBufferCount =
    BufferSettingService.getLightMaterialDataBufferCount(currentState.settingRecord);
  let (currentLightMaterialRecord, targetLightMaterialRecord) =
    _restoreTypeArrays(
      currentLightMaterialRecord,
      targetLightMaterialRecord,
      lightMaterialDataBufferCount
    );
  {
    ...targetState,
    lightMaterialRecord:
      Some({
        ...targetLightMaterialRecord,
        buffer: currentLightMaterialRecord.buffer,
        shaderIndices: currentLightMaterialRecord.shaderIndices,
        diffuseColors: currentLightMaterialRecord.diffuseColors,
        specularColors: currentLightMaterialRecord.specularColors,
        shininess: currentLightMaterialRecord.shininess
      })
  }
};