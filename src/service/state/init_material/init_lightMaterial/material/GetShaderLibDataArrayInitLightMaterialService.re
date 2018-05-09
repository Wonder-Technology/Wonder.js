open StateRenderType;

open RenderConfigType;

let _findFirstShaderData = (shaderLibName: string, shaderLibs: shaderLibs) =>
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
    |> Js.Array.map((name: string) => _findFirstShaderData(name, shaderLibs)),
    resultDataArr
  );

let _getMaterialShaderLibDataArrByStaticBranchInstance =
    ((isSourceInstance, isSupportInstance), (shaderLibs, value), resultDataArr) =>
  resultDataArr
  |> ArrayService.push(
       _findFirstShaderData(
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

let _getMaterialShaderLibDataArrByStaticBranch =
    (
      (name, isSourceInstance, isSupportInstance),
      (staticBranchs: array(shaderMapData), shaderLibs),
      resultDataArr
    ) =>
  switch name {
  | "modelMatrix_instance"
  | "normalMatrix_instance" =>
    let {value} =
      JobConfigService.unsafeFindFirst(
        staticBranchs,
        name,
        (item) => JobConfigService.filterTargetName(item.name, name)
      );
    _getMaterialShaderLibDataArrByStaticBranchInstance(
      (isSourceInstance, isSupportInstance),
      (shaderLibs, value),
      resultDataArr
    )
  | _ =>
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

let _getMaterialShaderLibDataArrByType =
    (
      (
        materialIndex,
        type_,
        groups: array(shaderMapData),
        name,
        isSourceInstance,
        isSupportInstance
      ),
      (shaderLibs, staticBranchs: array(shaderMapData), dynamicBranchs),
      state,
      resultDataArr
    ) =>
  switch type_ {
  | "group" => _getMaterialShaderLibDataArrByGroup(groups, name, shaderLibs, resultDataArr)
  | "static_branch" =>
    _getMaterialShaderLibDataArrByStaticBranch(
      (name, isSourceInstance, isSupportInstance),
      (staticBranchs: array(shaderMapData), shaderLibs),
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
      materialIndex,
      (isSourceInstance, isSupportInstance),
      ({staticBranchs, dynamicBranchs, groups}, shaderLibItems, shaderLibs: shaderLibs),
      state
    ) =>
  shaderLibItems
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (resultDataArr, {type_, name}: shaderLibItem) =>
           switch type_ {
           | None => resultDataArr |> ArrayService.push(_findFirstShaderData(name, shaderLibs))
           | Some(type_) =>
             _getMaterialShaderLibDataArrByType(
               (materialIndex, type_, groups, name, isSourceInstance, isSupportInstance),
               (shaderLibs, staticBranchs, dynamicBranchs),
               state,
               resultDataArr
             )
           }
       ),
       WonderCommonlib.ArrayService.createEmpty()
     );