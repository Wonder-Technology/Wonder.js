open RenderConfigType;

let findFirstShaderData = (shaderLibName: string, shaderLibs: shaderLibs) =>
  JobConfigService.unsafeFindFirst(
    shaderLibs,
    shaderLibName,
    (item: shaderLib) => JobConfigService.filterTargetName(item.name, shaderLibName)
  );

let _getMaterialShaderLibDataArrByGroup =
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

let getMaterialShaderLibDataArrByDynamicBranch =
    (
      (materialIndex, name),
      (dynamicBranchs: array(dynamicBranchData), shaderLibs, state),
      isPassFunc,
      resultDataArr
    ) => {
  let ({condition}: dynamicBranchData) as dynamicBranchData =
    JobConfigService.unsafeFindFirst(
      dynamicBranchs,
      name,
      (item) => JobConfigService.filterTargetName(item.name, name)
    );
  let dynamicBranchShaderLibNameOption =
    [@bs] isPassFunc(materialIndex, condition, state) ?
      GetDataRenderConfigService.getPass(dynamicBranchData) :
      GetDataRenderConfigService.getFail(dynamicBranchData);
  switch dynamicBranchShaderLibNameOption {
  | None => resultDataArr
  | Some(dynamicBranchShaderLibName) =>
    resultDataArr |> ArrayService.push(findFirstShaderData(dynamicBranchShaderLibName, shaderLibs))
  }
};

let getMaterialShaderLibDataArrByType =
    (
      (
        materialIndex,
        type_,
        groups: array(shaderMapData),
        name,
        isSourceInstance,
        isSupportInstance
      ),
      (shaderLibs, staticBranchs: array(shaderMapData), dynamicBranchs, state),
      (getMaterialShaderLibDataArrByStaticBranchFunc, isPassFunc),
      resultDataArr
    ) =>
  switch type_ {
  | "group" => _getMaterialShaderLibDataArrByGroup(groups, name, shaderLibs, resultDataArr)
  | "static_branch" =>
    [@bs]
    getMaterialShaderLibDataArrByStaticBranchFunc(
      (name, isSourceInstance, isSupportInstance),
      (staticBranchs: array(shaderMapData), shaderLibs),
      resultDataArr
    )
  | "dynamic_branch" =>
    getMaterialShaderLibDataArrByDynamicBranch(
      (materialIndex, name),
      (dynamicBranchs, shaderLibs, state),
      isPassFunc,
      resultDataArr
    )
  | _ =>
    WonderLog.Log.debugJson(
      WonderLog.Log.buildDebugJsonMessage(~description={j|shaderLibs|j}, ~var=shaderLibs),
      IsDebugMainService.getIsDebug(StateDataMain.stateData)
    );
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getMaterialShaderLibDataArrByType",
        ~description={j|unknown type_:$type_|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let getMaterialShaderLibDataArr =
  (
    (
      (materialIndex:int, isSourceInstance:bool, isSupportInstance:bool),
      ({staticBranchs, dynamicBranchs, groups}, shaderLibItems, shaderLibs: shaderLibs),
      (getMaterialShaderLibDataArrByStaticBranchFunc, isPassFunc),
      state
    ) =>
      shaderLibItems
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs]
           (
             (resultDataArr, {type_, name}: shaderLibItem) =>
               switch type_ {
               | None => resultDataArr |> ArrayService.push(findFirstShaderData(name, shaderLibs))
               | Some(type_) =>
                 getMaterialShaderLibDataArrByType(
                   (materialIndex, type_, groups, name, isSourceInstance, isSupportInstance),
                   (shaderLibs, staticBranchs, dynamicBranchs, state),
                   (getMaterialShaderLibDataArrByStaticBranchFunc, isPassFunc),
                   resultDataArr
                 )
               }
           ),
           WonderCommonlib.ArrayService.createEmpty()
         )
  );