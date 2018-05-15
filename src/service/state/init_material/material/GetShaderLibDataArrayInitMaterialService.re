open RenderConfigType;

let findFirstShaderData = (shaderLibName: string, shaderLibs: shaderLibs) =>
  JobConfigService.unsafeFindFirst(
    shaderLibs,
    shaderLibName,
    (item: shaderLib) => JobConfigService.filterTargetName(item.name, shaderLibName)
  );

let getMaterialShaderLibDataArrByGroup =
    (groups: array(shaderMapData), name, shaderLibs, resultDataArr) =>
  Js.Array.concat(
    JobConfigService.unsafeFindFirst(
      groups,
      name,
      (item) => JobConfigService.filterTargetName(item.name, name)
    ).
      value
    |> Js.Array.map((name: string) => findFirstShaderData(name, shaderLibs)),
    resultDataArr
  );

let handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch =
    (name, staticBranchs: array(shaderMapData)) => {
  WonderLog.Log.debugJson(
    WonderLog.Log.buildDebugJsonMessage(~description={j|staticBranchs|j}, ~var=staticBranchs),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  WonderLog.Log.fatal(
    WonderLog.Log.buildFatalMessage(
      ~title="_getMaterialShaderLibDataArrByStaticBranch",
      ~description={j|unknown name:$name|j},
      ~reason="",
      ~solution={j||j},
      ~params={j||j}
    )
  )
};

let getMaterialShaderLibDataArrByStaticBranchInstance =
    ((isSourceInstance, isSupportInstance), (shaderLibs, value), resultDataArr) =>
  resultDataArr
  |> ArrayService.push(
       findFirstShaderData(
         if (isSourceInstance) {
           if (isSupportInstance) {
             value[1]
           } else {
             value[2]
           }
         } else {
           value[0]
         },
         shaderLibs
       )
     );