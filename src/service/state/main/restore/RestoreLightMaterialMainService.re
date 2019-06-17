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
    (currentLightMaterialRecord, targetLightMaterialRecord) =>
  currentLightMaterialRecord.shaderIndices
  === targetLightMaterialRecord.shaderIndices
  && currentLightMaterialRecord.diffuseColors
  === targetLightMaterialRecord.diffuseColors
  && currentLightMaterialRecord.specularColors
  === targetLightMaterialRecord.specularColors
  && currentLightMaterialRecord.diffuseTextureIndices
  === targetLightMaterialRecord.diffuseTextureIndices
  && currentLightMaterialRecord.specularTextureIndices
  === targetLightMaterialRecord.specularTextureIndices ?
    (currentLightMaterialRecord, targetLightMaterialRecord) :
    {
      let (
        shaderIndices,
        diffuseColors,
        specularColors,
        shininess,
        diffuseTextureIndices,
        specularTextureIndices,
      ) =
        (
          currentLightMaterialRecord.shaderIndices,
          currentLightMaterialRecord.diffuseColors,
          currentLightMaterialRecord.specularColors,
          currentLightMaterialRecord.shininess,
          currentLightMaterialRecord.diffuseTextureIndices,
          currentLightMaterialRecord.specularTextureIndices,
        )
        |> RecordLightMaterialMainService.setAllTypeArrDataToDefault(
             currentLightMaterialRecord.index,
             (
               DefaultTypeArrayValueService.getDefaultShaderIndex(),
               currentLightMaterialRecord.defaultDiffuseColor,
               currentLightMaterialRecord.defaultSpecularColor,
               currentLightMaterialRecord.defaultShininess,
               TextureIndexService.getDefaultTextureIndex(),
             ),
           );
      TypeArrayService.fillUint32ArrayWithUint32Array(
        (currentLightMaterialRecord.shaderIndices, 0),
        (targetLightMaterialRecord.shaderIndices, 0),
        Js.Typed_array.Uint32Array.length(
          targetLightMaterialRecord.shaderIndices,
        ),
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentLightMaterialRecord.diffuseColors, 0),
        (targetLightMaterialRecord.diffuseColors, 0),
        Js.Typed_array.Float32Array.length(
          targetLightMaterialRecord.diffuseColors,
        ),
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentLightMaterialRecord.specularColors, 0),
        (targetLightMaterialRecord.specularColors, 0),
        Js.Typed_array.Float32Array.length(
          targetLightMaterialRecord.specularColors,
        ),
      )
      |> ignore;
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (currentLightMaterialRecord.shininess, 0),
        (targetLightMaterialRecord.shininess, 0),
        Js.Typed_array.Float32Array.length(
          targetLightMaterialRecord.shininess,
        ),
      )
      |> ignore;
      TypeArrayService.fillUint32ArrayWithUint32Array(
        (currentLightMaterialRecord.diffuseTextureIndices, 0),
        (targetLightMaterialRecord.diffuseTextureIndices, 0),
        Js.Typed_array.Uint32Array.length(
          targetLightMaterialRecord.diffuseTextureIndices,
        ),
      )
      |> ignore;
      TypeArrayService.fillUint32ArrayWithUint32Array(
        (currentLightMaterialRecord.specularTextureIndices, 0),
        (targetLightMaterialRecord.specularTextureIndices, 0),
        Js.Typed_array.Uint32Array.length(
          targetLightMaterialRecord.specularTextureIndices,
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
    _restoreTypeArrays(currentLightMaterialRecord, targetLightMaterialRecord);
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
        diffuseTextureIndices:
          currentLightMaterialRecord.diffuseTextureIndices,
        specularTextureIndices:
          currentLightMaterialRecord.specularTextureIndices,
      }),
  };
};