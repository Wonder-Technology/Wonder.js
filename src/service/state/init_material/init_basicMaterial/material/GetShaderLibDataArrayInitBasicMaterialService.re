open StateInitBasicMaterialType;

open RenderConfigType;

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
      GetShaderLibDataArrayInitMaterialService.getMaterialShaderLibDataArrByStaticBranchInstance(
        (isSourceInstance, isSupportInstance),
        (shaderLibs, value),
        resultDataArr,
      );
    | _ =>
      GetShaderLibDataArrayInitMaterialService.handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch(
        name,
        staticBranchs,
      )
    };

let _isPass =
  (. materialIndex, condition, {materialRecord} as state) =>
    switch (condition) {
    | "basic_has_map" =>
      MapUnitService.hasMap(
        OperateTypeArrayBasicMaterialService.getMapUnit(.
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
    };

let getMaterialShaderLibDataArr =
  (.
    materialIndex,
    (isSourceInstance, isSupportInstance),
    shaderLibTuple,
    state,
  ) =>
    GetShaderLibDataArrayInitMaterialService.getMaterialShaderLibDataArr(
      (materialIndex, isSourceInstance, isSupportInstance),
      shaderLibTuple,
      (_getMaterialShaderLibDataArrByStaticBranch, _isPass),
      state,
    );