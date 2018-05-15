open StateInitLightMaterialType;

open RenderConfigType;

let _getMaterialShaderLibDataArrByStaticBranch =
    (
      (name, isSourceInstance, isSupportInstance),
      (staticBranchs: array(shaderMapData), shaderLibs),
      resultDataArr
    ) =>
  switch name {
  | "modelMatrix_instance"
  | "normalMatrix_instance" =>
    let {value}: shaderMapData =
      JobConfigService.unsafeFindFirst(
        staticBranchs,
        name,
        (item) => JobConfigService.filterTargetName(item.name, name)
      );
    GetShaderLibDataArrayInitMaterialService.getMaterialShaderLibDataArrByStaticBranchInstance(
      (isSourceInstance, isSupportInstance),
      (shaderLibs, value),
      resultDataArr
    )
  | _ =>
    GetShaderLibDataArrayInitMaterialService.handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch(
      name,
      staticBranchs
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
      (shaderLibs, staticBranchs: array(shaderMapData)),
      state,
      resultDataArr
    ) =>
  switch type_ {
  | "group" =>
    GetShaderLibDataArrayInitMaterialService.getMaterialShaderLibDataArrByGroup(
      groups,
      name,
      shaderLibs,
      resultDataArr
    )
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
  [@bs]
  (
    (
      materialIndex: int,
      (isSourceInstance, isSupportInstance),
      ({staticBranchs, groups}, shaderLibItems, shaderLibs: shaderLibs),
      state: initLightMaterialState
    ) =>
      shaderLibItems
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs]
           (
             (resultDataArr, {type_, name}: shaderLibItem) =>
               switch type_ {
               | None =>
                 resultDataArr
                 |> ArrayService.push(
                      GetShaderLibDataArrayInitMaterialService.findFirstShaderData(
                        name,
                        shaderLibs
                      )
                    )
               | Some(type_) =>
                 _getMaterialShaderLibDataArrByType(
                   (materialIndex, type_, groups, name, isSourceInstance, isSupportInstance),
                   (shaderLibs, staticBranchs),
                   state,
                   resultDataArr
                 )
               }
           ),
           WonderCommonlib.ArrayService.createEmpty()
         )
  );