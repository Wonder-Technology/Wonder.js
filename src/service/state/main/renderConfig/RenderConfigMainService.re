open GameObjectType;

open RenderConfigType;

let _unsafeGetRenderConfigData = (state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|render job config exist|j}, ~actual={j|not|j}),
              () => state.renderConfigData |> assertExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  state.renderConfigData |> Js.Option.getExn
};

let getShaders = (state: MainStateDataType.state) => _unsafeGetRenderConfigData(state).shaders;

let getShaderLibs = (state: MainStateDataType.state) => _unsafeGetRenderConfigData(state).shader_libs;

let _findFirstShaderData = (shaderLibName: string, shaderLibs: shader_libs) =>
  JobConfigService.unsafeFindFirst(
    shaderLibs,
    shaderLibName,
    (item: shaderLib) => JobConfigService.filterTargetName(item.name, shaderLibName)
  );

/* |> WonderLog.Contract.ensureCheck(
     (first) => {
       open WonderLog;
       open Contract;
       open Operators;
       let shaderLibsJson = WonderLog.Log.getJsonStr(shaderLibs);
       test(
         Log.buildAssertMessage(~expect={j|find $shaderLibName in $shaderLibsJson|j}, ~actual={j|not|j}),
         () => first |> assertNullableExist
       )
     },
     IsDebugMainService.getIsDebug(MainStateData.stateData)
   ); */
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
    ((gameObject, state), (shaderLibs, value), resultDataArr) =>
  resultDataArr
  |> ArrayService.push(
       _findFirstShaderData(
         if (JudgeInstanceMainService.isSourceInstance(gameObject, state)) {
           if (JudgeInstanceMainService.isSupportInstance(state)) {
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
    ((gameObject, name, state), (static_branchs: array(shaderMapData), shaderLibs), resultDataArr) =>
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
      (gameObject, state),
      (shaderLibs, value),
      resultDataArr
    )
  | _ =>
    WonderLog.Log.debugJson(
      () =>
        WonderLog.Log.buildDebugJsonMessage(
          ~description={j|static_branchs|j},
          ~var=static_branchs
        ),
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
      (type_, groups: array(shaderMapData), name, gameObject, state),
      (shaderLibs, static_branchs: array(shaderMapData)),
      resultDataArr
    ) =>
  switch type_ {
  | "group" => _getMaterialShaderLibDataArrByGroup(groups, name, shaderLibs, resultDataArr)
  | "static_branch" =>
    _getMaterialShaderLibDataArrByStaticBranch(
      (gameObject, name, state),
      (static_branchs: array(shaderMapData), shaderLibs),
      resultDataArr
    )
  | _ =>
    WonderLog.Log.debugJson(
      () => WonderLog.Log.buildDebugJsonMessage(~description={j|shaderLibs|j}, ~var=shaderLibs),
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
      gameObject: gameObject,
      ({static_branchs, groups}, shaderLibItems, shaderLibs: shader_libs),
      state: MainStateDataType.state
    ) =>
  shaderLibItems
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (resultDataArr, {type_, name}: shaderLibItem) =>
           switch type_ {
           | None => resultDataArr |> ArrayService.push(_findFirstShaderData(name, shaderLibs))
           | Some(type_) =>
             _getMaterialShaderLibDataArrByType(
               (type_, groups, name, gameObject, state),
               (shaderLibs, static_branchs),
               resultDataArr
             )
           }
       ),
       WonderCommonlib.ArraySystem.createEmpty()
     );