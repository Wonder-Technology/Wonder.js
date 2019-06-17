open AllRenderConfigType;

let _findFirstShaderData = (shaderLibName: string, shaderLibs: shaderLibs) =>
  ArrayService.unsafeFindFirst(shaderLibs, shaderLibName, (item: shaderLib) =>
    item.name === shaderLibName
  );

let _getShaderLibDataArrByGroup =
    (groups: array(shaderMapData), name, shaderLibs, resultDataArr) =>
  Js.Array.concat(
    ArrayService.unsafeFindFirst(groups, name, item => item.name === name).
      value
    |> Js.Array.map((name: string) => _findFirstShaderData(name, shaderLibs)),
    resultDataArr,
  );

let getShaderLibDataArrByType =
    (
      (
        /* materialIndex, */
        type_,
        groups: array(shaderMapData),
        name,
        /* isSourceInstance,
           isSupportInstance, */
      ),
      (
        shaderLibs,
        /* staticBranchs: array(shaderMapData),
           dynamicBranchs, */
        state,
      ),
      /* (getShaderLibDataArrByStaticBranchFunc, isPassFunc), */
      resultDataArr,
    ) =>
  switch (type_) {
  | "group" =>
    _getShaderLibDataArrByGroup(groups, name, shaderLibs, resultDataArr)
  /* | "static_branch" =>
       getShaderLibDataArrByStaticBranchFunc(.
         (name, isSourceInstance, isSupportInstance),
         (staticBranchs: array(shaderMapData), shaderLibs),
         resultDataArr,
       )
     | "dynamic_branch" =>
       getShaderLibDataArrByDynamicBranch(
         (materialIndex, name),
         (dynamicBranchs, shaderLibs, state),
         isPassFunc,
         resultDataArr,
       ) */
  | _ =>
    WonderLog.Log.debugJson(
      WonderLog.Log.buildDebugJsonMessage(
        ~description={j|shaderLibs|j},
        ~var=shaderLibs,
      ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getShaderLibDataArrByType",
        ~description={j|unknown type_:$type_|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    );
  };

let getShaderLibDataArr =
    /* (materialIndex: int, isSourceInstance: bool, isSupportInstance: bool), */
    (
      (
        /* {staticBranchs, dynamicBranchs, groups}, */
        {groups},
        shaderLibItems,
        shaderLibs: shaderLibs,
      ),
      /* (getShaderLibDataArrByStaticBranchFunc, isPassFunc), */
      state,
    ) =>
  shaderLibItems
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. resultDataArr, {type_, name}: shaderLibItem) =>
         OptionService.isJsonSerializedValueNone(type_) ?
           resultDataArr
           |> ArrayService.push(_findFirstShaderData(name, shaderLibs)) :
           getShaderLibDataArrByType(
             (
               /* materialIndex, */
               type_ |> OptionService.unsafeGetJsonSerializedValue,
               groups,
               name,
               /* isSourceInstance,
                  isSupportInstance, */
             ),
             (shaderLibs, state),
             /* (getShaderLibDataArrByStaticBranchFunc, isPassFunc), */
             resultDataArr,
           ),
       WonderCommonlib.ArrayService.createEmpty(),
     );