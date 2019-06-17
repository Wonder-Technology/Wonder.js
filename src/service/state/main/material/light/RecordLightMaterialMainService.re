open StateDataMainType;

open MaterialType;

open LightMaterialType;

open Js.Typed_array;

open BufferAllLightMaterialService;

open OperateTypeArrayAllLightMaterialService;

let getRecord = ({lightMaterialRecord}) =>
  lightMaterialRecord |> OptionService.unsafeGet;

let setAllTypeArrDataToDefault =
    (
      lightMaterialCount: int,
      (
        defaultShaderIndex,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        defaultTextureIndex,
      ),
      (
        shaderIndices,
        diffuseColors,
        specularColors,
        shininess,
        diffuseTextureIndices,
        specularTextureIndices,
      ),
    ) => {
  let (
    shaderIndices,
    diffuseColors,
    specularColors,
    shininess,
    diffuseTextureIndices,
    specularTextureIndices,
  ) =
    WonderCommonlib.ArrayService.range(0, lightMaterialCount - 1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (
             shaderIndices,
             diffuseColors,
             specularColors,
             shininess,
             diffuseTextureIndices,
             specularTextureIndices,
           ),
           index,
         ) => (
           ShaderIndicesService.setShaderIndex(.
             index,
             defaultShaderIndex,
             shaderIndices,
           ),
           setDiffuseColor(index, defaultDiffuseColor, diffuseColors),
           setSpecularColor(index, defaultSpecularColor, specularColors),
           setShininess(index, defaultShininess, shininess),
           setTextureIndex(.
             index,
             defaultTextureIndex,
             diffuseTextureIndices,
           ),
           setTextureIndex(.
             index,
             defaultTextureIndex,
             specularTextureIndices,
           ),
         ),
         (
           shaderIndices,
           diffuseColors,
           specularColors,
           shininess,
           diffuseTextureIndices,
           specularTextureIndices,
         ),
       );
  (
    shaderIndices,
    diffuseColors,
    specularColors,
    shininess,
    diffuseTextureIndices,
    specularTextureIndices,
  );
};

let _setAllTypeArrDataToDefault =
    (
      lightMaterialCount: int,
      (
        defaultShaderIndex,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        defaultTextureIndex,
      ),
      (
        buffer,
        shaderIndices,
        diffuseColors,
        specularColors,
        shininess,
        diffuseTextureIndices,
        specularTextureIndices,
      ),
    ) => (
  buffer,
  setAllTypeArrDataToDefault(
    lightMaterialCount,
    (
      defaultShaderIndex,
      defaultDiffuseColor,
      defaultSpecularColor,
      defaultShininess,
      defaultTextureIndex,
    ),
    (
      shaderIndices,
      diffuseColors,
      specularColors,
      shininess,
      diffuseTextureIndices,
      specularTextureIndices,
    ),
  ),
);

let _initBufferData =
    (
      lightMaterialCount,
      (
        defaultShaderIndex,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShiness,
        defaultTextureIndex,
      ),
    ) => {
  let buffer = createBuffer(lightMaterialCount);
  let (
    shaderIndices,
    diffuseColors,
    specularColors,
    shininess,
    diffuseTextureIndices,
    specularTextureIndices,
  ) =
    CreateTypeArrayAllLightMaterialService.createTypeArrays(
      buffer,
      lightMaterialCount,
    );
  (
    buffer,
    shaderIndices,
    diffuseColors,
    specularColors,
    shininess,
    diffuseTextureIndices,
    specularTextureIndices,
  )
  |> _setAllTypeArrDataToDefault(
       lightMaterialCount,
       (
         defaultShaderIndex,
         defaultDiffuseColor,
         defaultSpecularColor,
         defaultShiness,
         defaultTextureIndex,
       ),
     );
};

let create = ({settingRecord} as state) => {
  let defaultShaderIndex =
    DefaultTypeArrayValueService.getDefaultShaderIndex();
  let defaultDiffuseColor = [|1., 1., 1.|];
  let defaultSpecularColor = [|1., 1., 1.|];
  let defaultShininess = 32.0;
  let defaultTextureIndex = TextureIndexService.getDefaultTextureIndex();
  let (
    buffer,
    (
      shaderIndices,
      diffuseColors,
      specularColors,
      shininess,
      diffuseTextureIndices,
      specularTextureIndices,
    ),
  ) =
    _initBufferData(
      BufferSettingService.getLightMaterialCount(settingRecord),
      (
        defaultShaderIndex,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        defaultTextureIndex,
      ),
    );
  state.lightMaterialRecord =
    Some({
      index: 0,
      buffer,
      shaderIndices,
      diffuseColors,
      specularColors,
      shininess,
      diffuseTextureIndices,
      specularTextureIndices,
      defaultDiffuseColor,
      defaultSpecularColor,
      defaultShininess,
      nameMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      gameObjectsMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      materialArrayForWorkerInit: WonderCommonlib.ArrayService.createEmpty(),
    });
  state;
};

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
        index,
        shaderIndices,
        diffuseColors,
        specularColors,
        shininess,
        diffuseTextureIndices,
        specularTextureIndices,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        nameMap,
        gameObjectsMap,
        disposedIndexArray,
        materialArrayForWorkerInit,
      } as record =
    state |> getRecord;
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...record,
        index,
        shaderIndices:
          shaderIndices
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(
               index * getShaderIndicesSize(),
             ),
        diffuseColors:
          diffuseColors
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getDiffuseColorsSize(),
             ),
        specularColors:
          specularColors
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getSpecularColorsSize(),
             ),
        shininess:
          shininess
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getShininessSize(),
             ),
        diffuseTextureIndices:
          diffuseTextureIndices
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(
               index * BufferMaterialService.getTextureIndicesSize(),
             ),
        specularTextureIndices:
          specularTextureIndices
          |> CopyTypeArrayService.copyUint32ArrayWithEndIndex(
               index * BufferMaterialService.getTextureIndicesSize(),
             ),
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        nameMap: nameMap |> WonderCommonlib.MutableSparseMapService.copy,
        gameObjectsMap:
          gameObjectsMap
          |> CopyTypeArrayService.deepCopyMutableSparseMapOfArray,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        materialArrayForWorkerInit:
          materialArrayForWorkerInit |> Js.Array.copy,
      }),
  };
};