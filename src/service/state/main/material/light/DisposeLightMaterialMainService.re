open StateDataMainType;

open SettingType;

open MaterialType;

open LightMaterialType;

open DisposeComponentService;

let isAlive = (material, {disposedIndexArray}) =>
  DisposeMaterialMainService.isAlive(material, disposedIndexArray);

let _disposeData = (isRemoveTexture, material, state) => {
  let state =
    state
    |> DisposeMaterialMainService.disposeMaps(
         isRemoveTexture,
         (material, MaterialType.LightMaterial),
         [|
           OperateLightMaterialMainService.getDiffuseMap(material, state),
           OperateLightMaterialMainService.getSpecularMap(material, state),
         |],
       );

  let {
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
      } as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);

  let shaderIndices =
    DisposeMaterialService.disposeData(
      material,
      shaderIndices,
      DefaultTypeArrayValueService.getDefaultShaderIndex(),
    );

  {
    ...state,
    lightMaterialRecord:
      Some({
        ...lightMaterialRecord,
        shaderIndices,
        diffuseColors:
          DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
            BufferAllLightMaterialService.getDiffuseColorIndex(material),
            BufferAllLightMaterialService.getDiffuseColorsSize(),
            defaultDiffuseColor,
            diffuseColors,
          ),
        specularColors:
          DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
            BufferAllLightMaterialService.getSpecularColorIndex(material),
            BufferAllLightMaterialService.getSpecularColorsSize(),
            defaultSpecularColor,
            specularColors,
          ),
        shininess:
          DisposeTypeArrayService.deleteAndResetFloat32(.
            BufferAllLightMaterialService.getShininessIndex(material),
            defaultShininess,
            shininess,
          ),
        diffuseTextureIndices:
          DisposeMaterialMainService.disposeTextureIndices(
            material,
            BufferAllLightMaterialService.getDiffuseTextureIndicesIndex,
            diffuseTextureIndices,
          ),
        specularTextureIndices:
          DisposeMaterialMainService.disposeTextureIndices(
            material,
            BufferAllLightMaterialService.getSpecularTextureIndicesIndex,
            specularTextureIndices,
          ),
        nameMap: nameMap |> disposeSparseMapData(material),
      }),
  };
};

let handleBatchDisposeComponentData =
  (. isRemoveTexture, materialDataMap, {settingRecord} as state) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                materialDataMap
                |> WonderCommonlib.MutableSparseMapService.getValidKeys,
                isAlive,
                RecordLightMaterialMainService.getRecord(state),
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );

    materialDataMap
    |> WonderCommonlib.MutableSparseMapService.reduceiValid(
         (. state, gameObjectArr, material) => {
           let lightMaterialRecord =
             RecordLightMaterialMainService.getRecord(state);

           let lightMaterialRecord =
             GroupLightMaterialService.batchRemoveGameObjects(
               gameObjectArr,
               material,
               lightMaterialRecord,
             );

           GroupLightMaterialService.isGroupLightMaterial(
             material,
             lightMaterialRecord,
           ) ?
             {...state, lightMaterialRecord: Some(lightMaterialRecord)} :
             {
               let state = state |> _disposeData(isRemoveTexture, material);

               let lightMaterialRecord =
                 RecordLightMaterialMainService.getRecord(state);

               {
                 ...state,
                 lightMaterialRecord:
                   Some({
                     ...lightMaterialRecord,
                     disposedIndexArray:
                       DisposeMaterialService.addDisposeIndex(
                         material,
                         lightMaterialRecord.disposedIndexArray,
                       ),
                   }),
               };
             };
         },
         state,
       );
  };

let handleBatchDisposeComponent =
    (isRemoveTexture, materialHasNoGameObjectArray, {settingRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;

      DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
        materialHasNoGameObjectArray,
        isAlive,
        state |> RecordLightMaterialMainService.getRecord,
      );
      test(
        Log.buildAssertMessage(
          ~expect={j|material has no gameObject|j},
          ~actual={j|has|j},
        ),
        () => {
          let materialRecord =
            state |> RecordLightMaterialMainService.getRecord;

          materialHasNoGameObjectArray
          |> Js.Array.filter(material =>
               GameObjectLightMaterialService.getGameObjects(
                 material,
                 materialRecord,
               )
               |> Js.Option.isSome
             )
          |> Js.Array.length == 0;
        },
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  materialHasNoGameObjectArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, material) => {
         let state = state |> _disposeData(isRemoveTexture, material);

         let lightMaterialRecord =
           RecordLightMaterialMainService.getRecord(state);

         {
           ...state,
           lightMaterialRecord:
             Some({
               ...lightMaterialRecord,
               disposedIndexArray:
                 DisposeMaterialService.addDisposeIndex(
                   material,
                   lightMaterialRecord.disposedIndexArray,
                 ),
             }),
         };
       },
       state,
     );
};