open StateDataMainType;

let markAssembled = (rabRelativePath, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    assembleRABData: {
      ...assetBundleRecord.assembleRABData,
      isAssembled:
        assetBundleRecord.assembleRABData.isAssembled
        |> WonderCommonlib.ImmutableHashMapService.set(rabRelativePath, true),
    },
  },
};

let isAssembled = (rabRelativePath, {assetBundleRecord} as state) =>
  switch (
    assetBundleRecord.assembleRABData.isAssembled
    |> WonderCommonlib.ImmutableHashMapService.get(rabRelativePath)
  ) {
  | None => false
  | Some(isAssembled) => isAssembled
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

let findDataInAllDependencyAbByName =
    (allDependencyAbRelativePath, name, state, findDataByNameFunc) =>
  allDependencyAbRelativePath
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. result, dependencyAbRelativePath) =>
         result |> Js.Option.isSome ?
           result : findDataByNameFunc(dependencyAbRelativePath, name, state),
       None,
     );

let unsafeFindDataInAllDependencyAbByName =
    (allDependencyAbRelativePath, name, state, findDataByNameFunc) =>
  switch (
    findDataInAllDependencyAbByName(
      allDependencyAbRelativePath,
      name,
      state,
      findDataByNameFunc,
    )
  ) {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="unsafeFindDataInAllDependencyAbByName",
        ~description={j|shouldn't find nothing|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  | Some(result) => result
  };

let findLightMaterialByName = (rabRelativePath, name, state) => Some(0);

let unsafeFindLightMaterialByName = (rabRelativePath, name, state) =>
  switch (findLightMaterialByName(rabRelativePath, name, state)) {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="unsafeFindLightMaterialByName",
        ~description={j|shouldn't find nothing|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  | Some(result) => result
  };

let findImageByName = (rabRelativePath, name, state) => Obj.magic(-1)->Some;

let unsafeFindImageByName = (rabRelativePath, name, state) =>
  switch (findImageByName(rabRelativePath, name, state)) {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="unsafeFindImageByName",
        ~description={j|shouldn't find nothing|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  | Some(result) => result
  };

let findGeometryByName = (rabRelativePath, name, state) =>
  Obj.magic(-1)->Some;

let unsafeFindGeometryByName = (rabRelativePath, name, state) =>
  switch (findGeometryByName(rabRelativePath, name, state)) {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="unsafeFindGeometryByName",
        ~description={j|shouldn't find nothing|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  | Some(result) => result
  };
/* let findBasicMaterialByName = (rabRelativePath, name, state) => 0;


   let findBasicSourceTextureByName = (rabRelativePath, name, state) => 0;

   let findGeometryByName = (rabRelativePath, name, state) => 0;

   let findScriptEventFunctionByName = (rabRelativePath, name, state) =>
     Obj.magic(-1);

   let findScriptAttributeByName = (rabRelativePath, name, state) =>
     Obj.magic(-1); */