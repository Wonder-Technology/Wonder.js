open RenderConfigType;

let getShaders = ({shaders}) => shaders;

let getShaderLibs = ({shader_libs}) => shader_libs;

let _findFirstShaderData = (shaderLibName: string, shaderLibs: shader_libs) =>
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
      (static_branchs: array(shaderMapData), shaderLibs),
      resultDataArr
    ) =>
  switch name {
  | "modelMatrix_instance"
  | "normalMatrix_instance" =>
    let {value} =
      JobConfigService.unsafeFindFirst(
        static_branchs,
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
      WonderLog.Log.buildDebugJsonMessage(~description={j|static_branchs|j}, ~var=static_branchs),
      IsDebugMainService.getIsDebug(MainStateData.stateData)
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
      (type_, groups: array(shaderMapData), name, isSourceInstance, isSupportInstance),
      (shaderLibs, static_branchs: array(shaderMapData)),
      resultDataArr
    ) =>
  switch type_ {
  | "group" => _getMaterialShaderLibDataArrByGroup(groups, name, shaderLibs, resultDataArr)
  | "static_branch" =>
    _getMaterialShaderLibDataArrByStaticBranch(
      (name, isSourceInstance, isSupportInstance),
      (static_branchs: array(shaderMapData), shaderLibs),
      resultDataArr
    )
  | _ =>
    WonderLog.Log.debugJson(
      WonderLog.Log.buildDebugJsonMessage(~description={j|shaderLibs|j}, ~var=shaderLibs),
      IsDebugMainService.getIsDebug(MainStateData.stateData)
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
      isSourceInstance,
      isSupportInstance,
      ({static_branchs, groups}, shaderLibItems, shaderLibs: shader_libs)
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
               (type_, groups, name, isSourceInstance, isSupportInstance),
               (shaderLibs, static_branchs),
               resultDataArr
             )
           }
       ),
       WonderCommonlib.ArrayService.createEmpty()
     );