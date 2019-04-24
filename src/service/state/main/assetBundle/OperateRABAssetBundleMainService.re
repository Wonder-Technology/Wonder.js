open StateDataMainType;

let _markIsAssembled =
    (rabRelativePath, isAssembled, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    assembleRABData: {
      ...assetBundleRecord.assembleRABData,
      isAssembledMap:
        assetBundleRecord.assembleRABData.isAssembledMap
        |> WonderCommonlib.ImmutableHashMapService.set(
             rabRelativePath,
             isAssembled,
           ),
    },
  },
};

let markAssembled = (rabRelativePath, {assetBundleRecord} as state) =>
  _markIsAssembled(rabRelativePath, true, state);

let markNotAssembled = (rabRelativePath, {assetBundleRecord} as state) =>
  _markIsAssembled(rabRelativePath, false, state);

let isAssembled = (rabRelativePath, {assetBundleRecord} as state) =>
  switch (
    assetBundleRecord.assembleRABData.isAssembledMap
    |> WonderCommonlib.ImmutableHashMapService.get(rabRelativePath)
  ) {
  | None => false
  | Some(isAssembled) => isAssembled
  };

let releaseAssembleRABData = (rabRelativePath, {assetBundleRecord} as state) => {
  let {assembleRABData} = assetBundleRecord;

  {
    ...state,
    assetBundleRecord: {
      ...assetBundleRecord,
      assembleRABData: {
        ...assembleRABData,
        imageMap:
          assembleRABData.imageMap
          |> WonderCommonlib.ImmutableHashMapService.deleteVal(
               rabRelativePath,
             ),
        textureMap:
          assembleRABData.textureMap
          |> WonderCommonlib.ImmutableHashMapService.deleteVal(
               rabRelativePath,
             ),
        basicMaterialMap:
          assembleRABData.basicMaterialMap
          |> WonderCommonlib.ImmutableHashMapService.deleteVal(
               rabRelativePath,
             ),
        lightMaterialMap:
          assembleRABData.lightMaterialMap
          |> WonderCommonlib.ImmutableHashMapService.deleteVal(
               rabRelativePath,
             ),
        geometryMap:
          assembleRABData.geometryMap
          |> WonderCommonlib.ImmutableHashMapService.deleteVal(
               rabRelativePath,
             ),
        scriptEventFunctionDataMap:
          assembleRABData.scriptEventFunctionDataMap
          |> WonderCommonlib.ImmutableHashMapService.deleteVal(
               rabRelativePath,
             ),
        scriptAttributeMap:
          assembleRABData.scriptAttributeMap
          |> WonderCommonlib.ImmutableHashMapService.deleteVal(
               rabRelativePath,
             ),
      },
    },
  }
  /* TODO test */
  |> markNotAssembled(rabRelativePath);
};

let setAssembleRABData =
    (
      rabRelativePath,
      (
        imageMapByName,
        textureMapByName,
        basicMaterialMap,
        lightMaterialMap,
        geometryMap,
        scriptEventFunctionDataMap,
        scriptAttributeMap,
      ),
      {assetBundleRecord} as state,
    ) => {
  let {assembleRABData} = assetBundleRecord;

  /* let {
       imageMap,
       textureMap,
       basicMaterialMap,
       lightMaterialMap,
       geometryMap,
       scriptEventFunctionDataMap,
       scriptAttributeMap,
     } = assembleRABData; */

  {
    ...state,
    assetBundleRecord: {
      ...assetBundleRecord,
      assembleRABData: {
        ...assembleRABData,
        imageMap:
          assembleRABData.imageMap
          |> WonderCommonlib.ImmutableHashMapService.set(
               rabRelativePath,
               imageMapByName,
             ),
        textureMap:
          assembleRABData.textureMap
          |> WonderCommonlib.ImmutableHashMapService.set(
               rabRelativePath,
               textureMapByName,
             ),
        basicMaterialMap:
          assembleRABData.basicMaterialMap
          |> WonderCommonlib.ImmutableHashMapService.set(
               rabRelativePath,
               basicMaterialMap,
             ),
        lightMaterialMap:
          assembleRABData.lightMaterialMap
          |> WonderCommonlib.ImmutableHashMapService.set(
               rabRelativePath,
               lightMaterialMap,
             ),
        geometryMap:
          assembleRABData.geometryMap
          |> WonderCommonlib.ImmutableHashMapService.set(
               rabRelativePath,
               geometryMap,
             ),
        scriptEventFunctionDataMap:
          assembleRABData.scriptEventFunctionDataMap
          |> WonderCommonlib.ImmutableHashMapService.set(
               rabRelativePath,
               scriptEventFunctionDataMap,
             ),
        scriptAttributeMap:
          assembleRABData.scriptAttributeMap
          |> WonderCommonlib.ImmutableHashMapService.set(
               rabRelativePath,
               scriptAttributeMap,
             ),
      },
    },
  };
};

let findDataInAllDependencyRAbByName =
    (allDependencyRAbRelativePath, name, state, findDataByNameFunc) =>
  allDependencyRAbRelativePath
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. result, dependencyAbRelativePath) =>
         result |> Js.Option.isSome ?
           result : findDataByNameFunc(dependencyAbRelativePath, name, state),
       None,
     );

let unsafeFindDataInAllDependencyRAbByName =
    (allDependencyRAbRelativePath, name, state, findDataByNameFunc) =>
  findDataInAllDependencyRAbByName(
    allDependencyRAbRelativePath,
    name,
    state,
    findDataByNameFunc,
  )
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect={j|data by name:$name exist in all dependency rabs|j},
         ~actual={j|not|j},
       ),
     );

/* switch (
     findDataInAllDependencyRAbByName(
       allDependencyRAbRelativePath,
       name,
       state,
       findDataByNameFunc,
     )
   ) {
   | None =>
     WonderLog.Log.fatal(
       WonderLog.Log.buildFatalMessage(
         ~title="unsafeFindDataInAllDependencyRAbByName",
         ~description={j|shouldn't find nothing|j},
         ~reason="",
         ~solution={j||j},
         ~params={j||j},
       ),
     )
   | Some(result) => result
   }; */

let _findDataByName = (rabRelativePath, name, dataMap) =>
  dataMap
  |> WonderCommonlib.ImmutableHashMapService.get(rabRelativePath)
  |> Js.Option.andThen((. map) =>
       map |> WonderCommonlib.ImmutableHashMapService.get(name)
     );

let findBasicMaterialByName = (rabRelativePath, name, state) =>
  _findDataByName(
    rabRelativePath,
    name,
    state.assetBundleRecord.assembleRABData.basicMaterialMap,
  );

let unsafeFindBasicMaterialByName = (rabRelativePath, name, state) =>
  findBasicMaterialByName(rabRelativePath, name, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|basicMaterial by name:$name exist in rabRelativePath:$rabRelativePath|j},
         ~actual={j|not|j},
       ),
     );

let findLightMaterialByName = (rabRelativePath, name, state) =>
  _findDataByName(
    rabRelativePath,
    name,
    state.assetBundleRecord.assembleRABData.lightMaterialMap,
  );

let unsafeFindLightMaterialByName = (rabRelativePath, name, state) =>
  findLightMaterialByName(rabRelativePath, name, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|lightMaterial by name:$name exist in rabRelativePath:$rabRelativePath|j},
         ~actual={j|not|j},
       ),
     );

let findImageByName = (rabRelativePath, name, state) =>
  _findDataByName(
    rabRelativePath,
    name,
    state.assetBundleRecord.assembleRABData.imageMap,
  );

let unsafeFindImageByName = (rabRelativePath, name, state) =>
  findImageByName(rabRelativePath, name, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|image by name:$name exist in rabRelativePath:$rabRelativePath|j},
         ~actual={j|not|j},
       ),
     );

let findTextureByName = (rabRelativePath, name, state) =>
  _findDataByName(
    rabRelativePath,
    name,
    state.assetBundleRecord.assembleRABData.textureMap,
  );

let unsafeFindTextureByName = (rabRelativePath, name, state) =>
  findTextureByName(rabRelativePath, name, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|texture by name:$name exist in rabRelativePath:$rabRelativePath|j},
         ~actual={j|not|j},
       ),
     );

let findGeometryByName = (rabRelativePath, name, state) =>
  _findDataByName(
    rabRelativePath,
    name,
    state.assetBundleRecord.assembleRABData.geometryMap,
  );

let unsafeFindGeometryByName = (rabRelativePath, name, state) =>
  findGeometryByName(rabRelativePath, name, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|geometry by name:$name exist in rabRelativePath:$rabRelativePath|j},
         ~actual={j|not|j},
       ),
     );

let findScriptEventFunctionDataByName = (rabRelativePath, name, state) =>
  _findDataByName(
    rabRelativePath,
    name,
    state.assetBundleRecord.assembleRABData.scriptEventFunctionDataMap,
  );

let unsafeFindScriptEventFunctionDataByName = (rabRelativePath, name, state) =>
  findScriptEventFunctionDataByName(rabRelativePath, name, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|scriptEventFunction data by name:$name exist in rabRelativePath:$rabRelativePath|j},
         ~actual={j|not|j},
       ),
     );

let findScriptAttributeByName = (rabRelativePath, name, state) =>
  _findDataByName(
    rabRelativePath,
    name,
    state.assetBundleRecord.assembleRABData.scriptAttributeMap,
  );

let unsafeFindScriptAttributeByName = (rabRelativePath, name, state) =>
  findScriptAttributeByName(rabRelativePath, name, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|scriptAttribute by name:$name exist in rabRelativePath:$rabRelativePath|j},
         ~actual={j|not|j},
       ),
     );