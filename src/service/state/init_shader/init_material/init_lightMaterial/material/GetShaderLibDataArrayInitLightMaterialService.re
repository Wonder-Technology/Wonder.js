open StateInitLightMaterialType;

open RenderConfigType;

let _getMaterialShaderLibDataArrByStaticBranch =
  (.
    (name, isSourceInstance, isSupportInstance),
    (staticBranchs: array(shaderMapData), shaderLibs),
    resultDataArr,
  ) =>
    switch (name) {
    | "modelMatrix_instance"
    | "normalMatrix_instance" =>
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
    switch (condition) {
    | "light_has_map" =>
      MapUnitService.hasMap(
        OperateTypeArrayLightMaterialService.getDiffuseMapUnit(.
          materialIndex,
          materialRecord.diffuseMapUnits,
        ),
      )
      || MapUnitService.hasMap(
           OperateTypeArrayLightMaterialService.getSpecularMapUnit(.
             materialIndex,
             materialRecord.specularMapUnits,
           ),
         )
    | "has_diffuse_map" =>
      MapUnitService.hasMap(
        OperateTypeArrayLightMaterialService.getDiffuseMapUnit(.
          materialIndex,
          materialRecord.diffuseMapUnits,
        ),
      )
    | "has_specular_map" =>
      MapUnitService.hasMap(
        OperateTypeArrayLightMaterialService.getSpecularMapUnit(.
          materialIndex,
          materialRecord.specularMapUnits,
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
    materialIndex: int,
    (isSourceInstance, isSupportInstance),
    shaderLibTuple,
    state: initLightMaterialState,
  ) =>
    GetShaderLibDataArrayInitMaterialAllService.getMaterialShaderLibDataArr(
      (materialIndex, isSourceInstance, isSupportInstance),
      shaderLibTuple,
      (_getMaterialShaderLibDataArrByStaticBranch, _isPass),
      state,
    );