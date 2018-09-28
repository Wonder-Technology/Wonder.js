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
  &&
  currentLightMaterialRecord.diffuseColors === targetLightMaterialRecord.
                                                 diffuseColors
  &&
  currentLightMaterialRecord.specularColors === targetLightMaterialRecord.
                                                  specularColors
  &&
  currentLightMaterialRecord.textureIndices === targetLightMaterialRecord.
                                                  textureIndices
  &&
  currentLightMaterialRecord.diffuseMapUnits === targetLightMaterialRecord.
                                                   diffuseMapUnits
  &&
  currentLightMaterialRecord.specularMapUnits === targetLightMaterialRecord.
                                                    specularMapUnits ?
    (currentLightMaterialRecord, targetLightMaterialRecord) :
    {
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
        (currentLightMaterialRecord.textureIndices, 0),
        (targetLightMaterialRecord.textureIndices, 0),
        Js.Typed_array.Uint32Array.length(
          targetLightMaterialRecord.textureIndices,
        ),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentLightMaterialRecord.diffuseMapUnits, 0),
        (targetLightMaterialRecord.diffuseMapUnits, 0),
        Js.Typed_array.Uint8Array.length(
          targetLightMaterialRecord.diffuseMapUnits,
        ),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentLightMaterialRecord.specularMapUnits, 0),
        (targetLightMaterialRecord.specularMapUnits, 0),
        Js.Typed_array.Uint8Array.length(
          targetLightMaterialRecord.specularMapUnits,
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
        textureIndices: currentLightMaterialRecord.textureIndices,
        diffuseMapUnits: currentLightMaterialRecord.diffuseMapUnits,
        specularMapUnits: currentLightMaterialRecord.specularMapUnits,
      }),
  };
};