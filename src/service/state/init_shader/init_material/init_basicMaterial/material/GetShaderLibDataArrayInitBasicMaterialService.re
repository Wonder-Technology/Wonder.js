open StateInitBasicMaterialType;

open AllRenderConfigType;

let _getMaterialShaderLibDataArrByStaticBranch =
  (.
    (name, isSourceInstance, isSupportInstance),
    (staticBranchs: array(shaderMapData), shaderLibs),
    resultDataArr,
  ) =>
    switch (name) {
    | "modelMatrix_instance" =>
      let {value}: shaderMapData =
        ArrayService.unsafeFindFirst(staticBranchs, name, item =>
          item.name === name
        );
      GetShaderLibDataArrayInitMaterialAllService.getMaterialShaderLibDataArrByStaticBranchInstance(
        (isSourceInstance, isSupportInstance),
        (shaderLibs, value),
        resultDataArr,
      );
    | _ =>
      GetShaderLibDataArrayInitMaterialAllService.handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch(
        name,
        staticBranchs,
      )
    };

let _isPass =
  (. materialIndex, condition, {materialRecord} as state) =>
    /* switch (condition) {
       | "basic_has_map" =>
         MapUnitService.hasMap(
           OperateTypeArrayAllBasicMaterialService.getActivableTextureUnit(.
             materialIndex,
             materialRecord.mapUnits,
           ),
         )
       | _ =>
         WonderLog.Log.fatal(
           WonderLog.Log.buildFatalMessage(
             ~title="_isPass",
             ~description={j|unknown condition:$condition|j},
             ~reason="",
             ~solution={j||j},
             ~params={j||j},
           ),
         )
       }; */
    true;

let getMaterialShaderLibDataArr =
  (.
    materialIndex,
    (isSourceInstance, isSupportInstance),
    shaderLibTuple,
    state,
  ) =>
    GetShaderLibDataArrayInitMaterialAllService.getMaterialShaderLibDataArr(
      (materialIndex, isSourceInstance, isSupportInstance),
      shaderLibTuple,
      (_getMaterialShaderLibDataArrByStaticBranch, _isPass),
      state,
    );