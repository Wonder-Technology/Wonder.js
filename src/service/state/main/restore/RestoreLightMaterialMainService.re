open StateDataMainType;

open LightMaterialType;

let _resetShaderIndices = state => {
  let {index, shaderIndices} as record =
    RecordLightMaterialMainService.getRecord(state);
  {
    ...state,
    lightMaterialRecord:
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
    (settingRecord, currentLightMaterialRecord, targetLightMaterialRecord) => {
  let (
    shaderIndices,
    diffuseColors,
    specularColors,
    shininess,
    textureIndices,
    diffuseMapUnits,
    specularMapUnits,
  ) =
    (
      currentLightMaterialRecord.shaderIndices,
      currentLightMaterialRecord.diffuseColors,
      currentLightMaterialRecord.specularColors,
      currentLightMaterialRecord.shininess,
      currentLightMaterialRecord.textureIndices,
      currentLightMaterialRecord.diffuseMapUnits,
      currentLightMaterialRecord.specularMapUnits,
    )
    |> RecordLightMaterialMainService.setAllTypeArrDataToDefault(
         currentLightMaterialRecord.index,
         (
           DefaultTypeArrayValueService.getDefaultShaderIndex(),
           currentLightMaterialRecord.defaultDiffuseColor,
           currentLightMaterialRecord.defaultSpecularColor,
           currentLightMaterialRecord.defaultShininess,
         ),
       );
  TypeArrayService.fillUint32ArrayWithUint32Array(
    (currentLightMaterialRecord.shaderIndices, 0),
    (targetLightMaterialRecord.copiedShaderIndices, 0),
    RecordLightMaterialMainService.getShaderIndicesEndIndex(
      targetLightMaterialRecord.index,
    ),
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentLightMaterialRecord.diffuseColors, 0),
    (targetLightMaterialRecord.copiedDiffuseColors, 0),
    RecordLightMaterialMainService.getDiffuseColorsEndIndex(
      targetLightMaterialRecord.index,
    ),
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentLightMaterialRecord.specularColors, 0),
    (targetLightMaterialRecord.copiedSpecularColors, 0),
    RecordLightMaterialMainService.getSpecularColorsEndIndex(
      targetLightMaterialRecord.index,
    ),
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentLightMaterialRecord.shininess, 0),
    (targetLightMaterialRecord.copiedShininess, 0),
    RecordLightMaterialMainService.getShininessEndIndex(
      targetLightMaterialRecord.index,
    ),
  )
  |> ignore;
  TypeArrayService.fillUint32ArrayWithUint32Array(
    (currentLightMaterialRecord.textureIndices, 0),
    (targetLightMaterialRecord.copiedTextureIndices, 0),
    RecordLightMaterialMainService.getTextureIndicesEndIndex(
      settingRecord,
      targetLightMaterialRecord.index,
    ),
  )
  |> ignore;
  TypeArrayService.fillUint8ArrayWithUint8Array(
    (currentLightMaterialRecord.diffuseMapUnits, 0),
    (targetLightMaterialRecord.copiedDiffuseMapUnits, 0),
    RecordLightMaterialMainService.getMapUnitsEndIndex(
      targetLightMaterialRecord.index,
    ),
  )
  |> ignore;
  TypeArrayService.fillUint8ArrayWithUint8Array(
    (currentLightMaterialRecord.specularMapUnits, 0),
    (targetLightMaterialRecord.copiedSpecularMapUnits, 0),
    RecordLightMaterialMainService.getMapUnitsEndIndex(
      targetLightMaterialRecord.index,
    ),
  )
  |> ignore;
  (currentLightMaterialRecord, targetLightMaterialRecord);
};

let restore = (gl, currentState, targetState) => {
  let targetState = _resetShaderIndices(targetState);
  let {index, disposedIndexArray} =
    RecordLightMaterialMainService.getRecord(targetState);
  let targetState =
    targetState
    |> InitLightMaterialMainService.initMaterials(
         AliveMaterialService.getAllAliveMaterials(index, disposedIndexArray),
         gl,
       );
  let currentLightMaterialRecord =
    RecordLightMaterialMainService.getRecord(currentState);
  let targetLightMaterialRecord =
    RecordLightMaterialMainService.getRecord(targetState);
  let (currentLightMaterialRecord, targetLightMaterialRecord) =
    _restoreTypeArrays(
      currentState.settingRecord,
      currentLightMaterialRecord,
      targetLightMaterialRecord,
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
        shininess: currentLightMaterialRecord.shininess,
        textureIndices: currentLightMaterialRecord.textureIndices,
        diffuseMapUnits: currentLightMaterialRecord.diffuseMapUnits,
        specularMapUnits: currentLightMaterialRecord.specularMapUnits,
      }),
  };
};