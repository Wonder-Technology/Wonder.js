open StateDataMainType;

let markAssembled = (rabRelativePath, {assetBundleRecord} as state) => {
  ...state,
  assetBundleRecord: {
    ...assetBundleRecord,
    assembleRABData: {
      ...assetBundleRecord.assembleRABData,
      isAssembledMap:
        assetBundleRecord.assembleRABData.isAssembledMap
        |> WonderCommonlib.ImmutableHashMapService.set(rabRelativePath, true),
    },
  },
};

let isAssembled = (rabRelativePath, {assetBundleRecord} as state) =>
  switch (
    assetBundleRecord.assembleRABData.isAssembledMap
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

let findLightMaterialByName = (rabRelativePath, name, state) => Some(0);

let unsafeFindLightMaterialByName = (rabRelativePath, name, state) =>
  findLightMaterialByName(rabRelativePath, name, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|lightMaterial by name:$name exist in rabRelativePath:$rabRelativePath|j},
         ~actual={j|not|j},
       ),
     );

/* switch (findLightMaterialByName(rabRelativePath, name, state)) {
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
   }; */

let findImageByName = (rabRelativePath, name, state) => Obj.magic(-1)->Some;

let unsafeFindImageByName = (rabRelativePath, name, state) =>
  findImageByName(rabRelativePath, name, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|image by name:$name exist in rabRelativePath:$rabRelativePath|j},
         ~actual={j|not|j},
       ),
     );

/* switch (findImageByName(rabRelativePath, name, state)) {
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
   }; */

let findGeometryByName = (rabRelativePath, name, state) =>
  Obj.magic(-1)->Some;

let unsafeFindGeometryByName = (rabRelativePath, name, state) =>
  findGeometryByName(rabRelativePath, name, state)
  |> OptionService.unsafeGetWithMessage(
       WonderLog.Log.buildAssertMessage(
         ~expect=
           {j|geometry by name:$name exist in rabRelativePath:$rabRelativePath|j},
         ~actual={j|not|j},
       ),
     );

/* switch (findGeometryByName(rabRelativePath, name, state)) {
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
   }; */
/* let findBasicMaterialByName = (rabRelativePath, name, state) => 0;


   let findBasicSourceTextureByName = (rabRelativePath, name, state) => 0;

   let findGeometryByName = (rabRelativePath, name, state) => 0;

   let findScriptEventFunctionByName = (rabRelativePath, name, state) =>
     Obj.magic(-1);

   let findScriptAttributeByName = (rabRelativePath, name, state) =>
     Obj.magic(-1); */