open StateDataMainType;

let getLoadedRAB = (rabRelativePath, {assetBundleRecord} as state) =>
  assetBundleRecord.assembleRABData.loadedRABMap
  |> WonderCommonlib.ImmutableHashMapService.get(rabRelativePath);

let unsafeGetLoadedRAB = (rabRelativePath, state) =>
  getLoadedRAB(rabRelativePath, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|rab arrayBuffer in rabRelativePath:$rabRelativePath loaded|j},
         ~actual={j|not|j},
       ),
     );

let setLoadedRAB = (rabRelativePath, rab, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    assembleRABData: {
      ...assetBundleRecord.assembleRABData,
      loadedRABMap:
        assetBundleRecord.assembleRABData.loadedRABMap
        |> WonderCommonlib.ImmutableHashMapService.set(rabRelativePath, rab),
    },
  },
};

let _markIsLoaded = (rabRelativePath, isLoaded, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    assembleRABData: {
      ...assetBundleRecord.assembleRABData,
      isLoadedMap:
        assetBundleRecord.assembleRABData.isLoadedMap
        |> WonderCommonlib.ImmutableHashMapService.set(
             rabRelativePath,
             isLoaded,
           ),
    },
  },
};

let markLoaded = (rabRelativePath, {assetBundleRecord} as state) =>
  _markIsLoaded(rabRelativePath, true, state);

let markNotLoaded = (rabRelativePath, {assetBundleRecord} as state) =>
  _markIsLoaded(rabRelativePath, false, state);

let isLoaded = (rabRelativePath, {assetBundleRecord} as state) =>
  switch (
    assetBundleRecord.assembleRABData.isLoadedMap
    |> WonderCommonlib.ImmutableHashMapService.get(rabRelativePath)
  ) {
  | None => false
  | Some(isLoaded) => isLoaded
  };

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

let releaseLoadedRAB = (rabRelativePath, {assetBundleRecord} as state) =>
  {
    ...state,
    assetBundleRecord: {
      ...assetBundleRecord,
      assembleRABData: {
        ...assetBundleRecord.assembleRABData,
        loadedRABMap:
          assetBundleRecord.assembleRABData.loadedRABMap
          |> WonderCommonlib.ImmutableHashMapService.deleteVal(
               rabRelativePath,
             ),
      },
    },
  }
  |> markNotLoaded(rabRelativePath);

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
        basicSourceTextureMap:
          assembleRABData.basicSourceTextureMap
          |> WonderCommonlib.ImmutableHashMapService.deleteVal(
               rabRelativePath,
             ),
        cubemapTextureMap:
          assembleRABData.cubemapTextureMap
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
  |> markNotAssembled(rabRelativePath);
};

let setAssembleRABData =
    (
      rabRelativePath,
      (
        imageMapByName,
        basicSourceTextureMapByName,
        cubemapTextureMapByName,
        basicMaterialMap,
        lightMaterialMap,
        geometryMap,
        scriptEventFunctionDataMap,
        scriptAttributeMap,
      ),
      {assetBundleRecord} as state,
    ) => {
  let {assembleRABData} = assetBundleRecord;

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
        basicSourceTextureMap:
          assembleRABData.basicSourceTextureMap
          |> WonderCommonlib.ImmutableHashMapService.set(
               rabRelativePath,
               basicSourceTextureMapByName,
             ),
        cubemapTextureMap:
          assembleRABData.cubemapTextureMap
          |> WonderCommonlib.ImmutableHashMapService.set(
               rabRelativePath,
               cubemapTextureMapByName,
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

let findDataInAllDependencyRABByName =
    (allDependencyRABRelativePath, name, state, findDataByNameFunc) =>
  allDependencyRABRelativePath
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. result, dependencyAbRelativePath) =>
         result |> Js.Option.isSome ?
           result : findDataByNameFunc(dependencyAbRelativePath, name, state),
       None,
     );

let unsafeFindDataInAllDependencyRABByName =
    (allDependencyRABRelativePath, name, state, findDataByNameFunc) =>
  findDataInAllDependencyRABByName(
    allDependencyRABRelativePath,
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
     findDataInAllDependencyRABByName(
       allDependencyRABRelativePath,
       name,
       state,
       findDataByNameFunc,
     )
   ) {
   | None =>
     WonderLog.Log.fatal(
       WonderLog.Log.buildFatalMessage(
         ~title="unsafeFindDataInAllDependencyRABByName",
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

let findBasicSourceTextureByName = (rabRelativePath, name, state) =>
  _findDataByName(
    rabRelativePath,
    name,
    state.assetBundleRecord.assembleRABData.basicSourceTextureMap,
  );

let unsafeFindBasicSourceTextureByName = (rabRelativePath, name, state) =>
  findBasicSourceTextureByName(rabRelativePath, name, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|basic source texture by name:$name exist in rabRelativePath:$rabRelativePath|j},
         ~actual={j|not|j},
       ),
     );

let findCubemapTextureByName = (rabRelativePath, name, state) =>
  _findDataByName(
    rabRelativePath,
    name,
    state.assetBundleRecord.assembleRABData.cubemapTextureMap,
  );

let unsafeFindCubemapTextureByName = (rabRelativePath, name, state) =>
  findCubemapTextureByName(rabRelativePath, name, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|cubemap texture by name:$name exist in rabRelativePath:$rabRelativePath|j},
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